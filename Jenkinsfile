pipeline { 
    agent { label 'built-in' }

    environment {
        // Azure credentials
        ARM_SUBSCRIPTION_ID = credentials('azure-subscription-id')
        ARM_CLIENT_ID = credentials('azure-client-id')
        ARM_CLIENT_SECRET = credentials('azure-client-secret')
        ARM_TENANT_ID = credentials('azure-tenant-id')
        
        // SSH key path
        SSH_KEY_PATH = "${WORKSPACE}/.ssh/azure-vm-key"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📦 Checking out code from Git repository...'
                checkout scm
            }
        }

        stage('Setup SSH Keys') {
            steps {
                echo '🔑 Setting up SSH keys...'
                script {
                    // Create .ssh directory
                    sh 'mkdir -p ${WORKSPACE}/.ssh'
                    sh 'chmod 700 ${WORKSPACE}/.ssh'
                    
                    // Extract SSH keys from Jenkins credentials
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'ssh-private-key',
                            keyFileVariable: 'SSH_PRIVATE_KEY_FILE',
                            usernameVariable: 'SSH_USER'
                        ),
                        string(credentialsId: 'ssh-public-key', variable: 'SSH_PUBLIC_KEY')
                    ]) {
                        // Copy private key
                        sh '''
                            cp "${SSH_PRIVATE_KEY_FILE}" "${SSH_KEY_PATH}"
                            chmod 600 "${SSH_KEY_PATH}"
                            
                            # Verify key format
                            echo "Private key format check:"
                            head -1 "${SSH_KEY_PATH}"
                            tail -1 "${SSH_KEY_PATH}"
                            
                            # Create public key file for reference
                            echo "${SSH_PUBLIC_KEY}" > "${SSH_KEY_PATH}.pub"
                            chmod 644 "${SSH_KEY_PATH}.pub"
                        '''
                    }
                }
            }
        }

        stage('Azure Login') {
            steps {
                echo '🔐 Logging in to Azure using service principal...'
                sh '''
                    az login --service-principal \
                        --username "$ARM_CLIENT_ID" \
                        --password "$ARM_CLIENT_SECRET" \
                        --tenant "$ARM_TENANT_ID"

                    az account show
                '''
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    echo '🔧 Initializing Terraform...'
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir('terraform') {
                    echo '📑 Creating Terraform plan...'
                    withCredentials([string(credentialsId: 'ssh-public-key', variable: 'SSH_PUBLIC_KEY')]) {
                        sh '''
                            terraform plan -out=tfplan -var="ssh_public_key=${SSH_PUBLIC_KEY}"
                        '''
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    echo '🚀 Applying Terraform configuration...'
                    withCredentials([string(credentialsId: 'ssh-public-key', variable: 'SSH_PUBLIC_KEY')]) {
                        sh '''
                            terraform apply -auto-approve -var="ssh_public_key=${SSH_PUBLIC_KEY}" tfplan
                        '''
                    }
                }
            }
        }

        stage('Wait for VM Initialization') {
            steps {
                echo '⏳ Waiting for VM to fully initialize...'
                script {
                    // Get public IP with better error handling
                    def publicIP = ""
                    dir('terraform') {
                        // First verify terraform state exists
                        sh 'terraform state list'
                        
                        // Get public IP with validation
                        publicIP = sh(
                            script: '''
                                # Check if output exists
                                terraform output | grep -q "public_ip_address" || {
                                    echo "ERROR: public_ip_address output not found"
                                    terraform output
                                    exit 1
                                }
                                
                                # Get the IP address
                                IP=$(terraform output -raw public_ip_address 2>/dev/null)
                                
                                # Validate IP format
                                if [[ -z "$IP" || "$IP" == "null" ]]; then
                                    echo "ERROR: Empty or null IP address"
                                    exit 1
                                fi
                                
                                # Basic IP validation - Fixed regex pattern
                                if [[ ! "$IP" =~ ^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$ ]]; then
                                    echo "ERROR: Invalid IP format: $IP"
                                    exit 1
                                fi
                                
                                echo "$IP"
                            ''',
                            returnStdout: true
                        ).trim()
                    }
                    
                    if (!publicIP || publicIP == "" || publicIP == "null") {
                        error "Failed to retrieve valid public IP address from Terraform output"
                    }
                    
                    echo "VM Public IP: ${publicIP}"
                    
                    // Store IP in environment for other stages
                    env.VM_PUBLIC_IP = publicIP
                    
                    // Wait for SSH service to be ready with improved error handling
                    echo "Waiting for SSH service to be ready..."
                    def sshReady = false
                    def maxAttempts = 20
                    
                    for (int i = 1; i <= maxAttempts; i++) {
                        try {
                            sh """
                                echo "Testing SSH connectivity to ${publicIP}:22 (attempt ${i}/${maxAttempts})"
                                timeout 10 nc -zv ${publicIP} 22 2>&1 || {
                                    echo "nc command failed for ${publicIP}:22"
                                    exit 1
                                }
                            """
                            sshReady = true
                            echo "✅ SSH service is ready after ${i} attempts"
                            break
                        } catch (Exception e) {
                            echo "SSH attempt ${i}/${maxAttempts} failed: ${e.getMessage()}"
                            if (i < maxAttempts) {
                                echo "Waiting 15 seconds before next attempt..."
                                sleep 15
                            }
                        }
                    }
                    
                    if (!sshReady) {
                        // Additional debugging before failing
                        sh """
                            echo "=== DEBUGGING SSH CONNECTIVITY ==="
                            echo "Target IP: ${publicIP}"
                            echo "Testing basic connectivity:"
                            ping -c 3 ${publicIP} || echo "Ping failed"
                            echo "Testing port 22 with telnet:"
                            timeout 5 telnet ${publicIP} 22 || echo "Telnet to port 22 failed"
                            echo "Checking Azure VM status via Azure CLI:"
                            az vm list-ip-addresses --output table || echo "Failed to list VM IPs"
                        """
                        error "SSH service not ready after ${maxAttempts} attempts"
                    }
                    
                    // Additional wait for VM to fully boot
                    echo "Waiting additional 30 seconds for VM to fully boot..."
                    sleep 30
                }
            }
        }

        stage('Test SSH Connection') {
            steps {
                echo '🔍 Testing SSH connection...'
                script {
                    def publicIP = env.VM_PUBLIC_IP
                    
                    if (!publicIP) {
                        error "Public IP not available from previous stage"
                    }
                    
                    echo "Testing SSH connection to: ${publicIP}"
                    
                    // Test SSH connection with proper error handling
                    def sshWorking = false
                    def maxAttempts = 10
                    
                    for (int i = 1; i <= maxAttempts; i++) {
                        try {
                            sh """
                                echo "SSH attempt ${i}/${maxAttempts} to ${publicIP}"
                                ssh -i "${SSH_KEY_PATH}" \
                                    -o StrictHostKeyChecking=no \
                                    -o UserKnownHostsFile=/dev/null \
                                    -o ConnectTimeout=30 \
                                    -o BatchMode=yes \
                                    -o LogLevel=ERROR \
                                    azureuser@${publicIP} 'echo "SSH connection successful! Hostname: \$(hostname)"'
                            """
                            sshWorking = true
                            echo "✅ SSH connection established after ${i} attempts"
                            break
                        } catch (Exception e) {
                            echo "SSH test attempt ${i}/${maxAttempts} failed: ${e.getMessage()}"
                            if (i == maxAttempts) {
                                // Show verbose output for debugging
                                sh """
                                    echo "=== FINAL SSH DEBUG OUTPUT ==="
                                    echo "SSH Key permissions:"
                                    ls -la "${SSH_KEY_PATH}"
                                    echo "SSH Key format check:"
                                    head -1 "${SSH_KEY_PATH}"
                                    echo "Attempting SSH with verbose output:"
                                    ssh -i "${SSH_KEY_PATH}" \
                                        -o StrictHostKeyChecking=no \
                                        -o UserKnownHostsFile=/dev/null \
                                        -o ConnectTimeout=30 \
                                        -vvv azureuser@${publicIP} 'echo "test"' 2>&1 | head -30 || true
                                """
                                error "SSH connection failed after ${maxAttempts} attempts"
                            } else {
                                sleep 15
                            }
                        }
                    }
                }
            }
        }

        stage('Generate Ansible Inventory') {
            steps {
                echo '🧾 Creating Ansible inventory file...'
                script {
                    def publicIP = env.VM_PUBLIC_IP
                    
                    if (!publicIP) {
                        error "Public IP not available"
                    }

                    echo "Creating Ansible inventory for IP: ${publicIP}"
                    sh 'mkdir -p ansible'

                    writeFile file: 'ansible/inventory', text: """[webservers]
${publicIP} ansible_user=azureuser ansible_ssh_private_key_file=${SSH_KEY_PATH} ansible_host_key_checking=false ansible_ssh_common_args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=30'

[all:vars]
ansible_python_interpreter=/usr/bin/python3
"""

                    echo "Inventory file created:"
                    sh 'cat ansible/inventory'
                }
            }
        }

        stage('Test Ansible Connection') {
            steps {
                dir('ansible') {
                    echo '🔗 Testing Ansible connection...'
                    retry(5) {
                        sh '''
                            echo "Testing Ansible ping..."
                            ansible webservers -i inventory -m ping -v --timeout=60
                        '''
                    }
                }
            }
        }

        stage('Install Next.js Server') {
            steps {
                dir('ansible') {
                    echo '🛠️ Installing Node.js and deploying Next.js app via Ansible...'
                    script {
                        sh '''
                            echo "Files in ansible directory:"
                            ls -la
                            echo "Files in app directory:"
                            ls -la ../app/ || echo "App directory not found"
                            ansible-playbook -i inventory install_web.yml -v --timeout=600
                        '''
                    }
                }
            }
        }
        
        stage('Verify Next.js Deployment') {
            steps {
                script {
                    def publicIP = env.VM_PUBLIC_IP
                    
                    if (!publicIP) {
                        error "Public IP not available"
                    }

                    echo "🌐 Verifying Next.js app at http://${publicIP}:3000"
                    echo "Waiting for Next.js server to start..."
                    sleep time: 60, unit: 'SECONDS'

                    retry(15) {
                        script {
                            try {
                                sh """
                                    echo "Testing connection to http://${publicIP}:3000"
                                    curl -fs --connect-timeout 15 --max-time 30 http://${publicIP}:3000 > /dev/null
                                    echo '✅ Next.js app is reachable!'
                                """
                            } catch (Exception e) {
                                echo "❌ Next.js app not reachable yet, retrying in 15 seconds..."
                                sleep time: 15, unit: 'SECONDS'
                                throw e
                            }
                        }
                    }

                    sh """
                        echo "📄 Next.js app preview:"
                        curl -s --connect-timeout 15 --max-time 30 http://${publicIP}:3000 | head -30
                    """

                    writeFile file: 'deployment_url.txt', text: "http://${publicIP}:3000"
                    archiveArtifacts artifacts: 'deployment_url.txt', fingerprint: true

                    echo "🎉 Next.js application successfully deployed at: http://${publicIP}:3000"
                }
            }
        }
    }

    post {
        always {
            echo '🧹 Cleaning up temporary files...'
            sh 'rm -rf ${WORKSPACE}/.ssh || true'
        }
        success {
            script {
                if (fileExists('deployment_url.txt')) {
                    def url = readFile('deployment_url.txt').trim()
                    echo """
✅ NEXT.JS DEPLOYMENT SUCCESSFUL!
🚀 URL: ${url}
📦 All stages completed successfully!
🚀 Infrastructure provisioned ✓
🔧 Node.js server installed ✓
⚛️  Next.js app deployed ✓
🎯 PM2 process manager running ✓

Your Next.js DevOps pipeline is working perfectly! 🎉
                    """
                } else {
                    echo '✅ Pipeline completed successfully!'
                }
            }
        }
        failure {
            echo '''
❌ Pipeline failed. Check the specific stage that failed above.

Common solutions:
1. SSH Key Issues: Regenerate SSH key pair and update Jenkins credentials
2. Azure Permissions: Verify service principal has proper permissions
3. Network Issues: Check Azure NSG rules allow SSH (port 22) and HTTP (port 3000)
4. VM Startup: Increase wait times for VM to fully boot
5. Node.js Build: Check if Next.js build process completed successfully
6. PM2 Process: Verify PM2 is managing the Next.js process correctly
7. Terraform Output: Ensure public_ip_address output is properly defined
            '''
        }
        cleanup {
            echo '🧼 Workspace cleanup complete.'
        }
    }
}