# DevOps Portfolio Project: Automated Deployment Pipeline

## 🎯 Project Overview

This project demonstrates a complete end-to-end DevOps pipeline that automates the provisioning, configuration, and deployment of a Next.js web application on Azure infrastructure. The entire process is orchestrated through Jenkins, showcasing modern DevOps practices including Infrastructure as Code (IaC), Configuration Management, and Continuous Deployment.

**🌐 Live Demo:** [https://me.huzaifali.tech/](https://me.huzaifali.tech/)

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Developer     │    │    Jenkins      │    │  Azure VM       │
│   Local Env     │───▶│   Pipeline      │───▶│  Ubuntu 20.04   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                        ┌─────────────────┐    ┌─────────────────┐
                        │   Terraform     │    │    NGINX +      │
                        │  Infrastructure │    │   Next.js App   │
                        │   Provisioning  │    │   + SSL/TLS     │
                        └─────────────────┘    └─────────────────┘
                                │
                                ▼
                        ┌─────────────────┐
                        │    Ansible      │
                        │  Configuration  │
                        │  & Deployment   │
                        └─────────────────┘
```

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Containerization** | Docker | Host Jenkins in isolated environment |
| **CI/CD** | Jenkins | Orchestrate automated deployment pipeline |
| **Infrastructure** | Terraform | Provision Azure VM and networking resources |
| **Configuration** | Ansible | Configure server and deploy applications |
| **Cloud Provider** | Microsoft Azure | Host virtual machine infrastructure |
| **Web Server** | NGINX | Reverse proxy and SSL termination |
| **Application** | Next.js | Modern React-based web application |
| **SSL/TLS** | Let's Encrypt (Certbot) | Secure HTTPS certificates |
| **Process Manager** | PM2 | Node.js application process management |
| **Version Control** | Git | Source code and configuration management |

## 🎪 Key Features

### 🔄 Automated Pipeline
- **One-Click Deployment**: Single Jenkins job triggers entire infrastructure and deployment process
- **Infrastructure as Code**: Terraform manages all Azure resources declaratively
- **Configuration Management**: Ansible ensures consistent server configuration
- **Zero-Downtime Deployment**: PM2 manages application lifecycle

### 🔒 Security & Performance
- **SSL/TLS Encryption**: Automated Let's Encrypt certificate provisioning
- **Security Headers**: HSTS, XSS Protection, Content Security Policy
- **Reverse Proxy**: NGINX handles SSL termination and load balancing
- **Static Asset Optimization**: Aggressive caching for performance

### 🌐 Production-Ready Setup
- **Custom Domain**: `me.huzaifali.tech` with DNS configuration
- **HTTP to HTTPS Redirect**: Automatic secure connection enforcement
- **Error Handling**: Comprehensive logging and monitoring
- **Auto-Renewal**: Automated SSL certificate renewal via cron jobs

## 📁 Project Structure

```
devops-portfolio-project/
├── terraform/
│   ├── main.tf                 # Azure VM provisioning
│   ├── variables.tf            # Terraform variables
│   └── outputs.tf              # Resource outputs
├── ansible/
│   ├── playbook.yml           # Main Ansible playbook
│   ├── inventory/             # Dynamic inventory configuration
│   └── roles/
│       ├── nodejs/            # Node.js installation
│       ├── nginx/             # NGINX configuration
│       └── ssl/               # SSL certificate management
├── application/
│   ├── package.json           # Next.js dependencies
│   ├── next.config.js         # Next.js configuration
│   └── src/                   # Application source code
├── jenkins/
│   ├── Dockerfile             # Jenkins container setup
│   └── Jenkinsfile            # Pipeline definition
├── scripts/
│   ├── deploy.sh              # Deployment automation
│   └── ssl-setup.sh           # SSL configuration script
└── docs/
    ├── MANUAL_SETUP.md        # Manual configuration guide
    └── TROUBLESHOOTING.md     # Common issues and solutions
```

## 🚀 Quick Start

### Prerequisites

- Azure subscription with appropriate permissions
- Docker installed locally
- Domain name configured (optional, for SSL)
- Git repository access

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/devops-portfolio-project.git
cd devops-portfolio-project
```

### 2. Configure Azure Credentials

```bash
# Set Azure service principal credentials
export ARM_CLIENT_ID="your-client-id"
export ARM_CLIENT_SECRET="your-client-secret"
export ARM_SUBSCRIPTION_ID="your-subscription-id"
export ARM_TENANT_ID="your-tenant-id"
```

### 3. Start Jenkins Container

```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

### 4. Setup Jenkins Pipeline

1. Access Jenkins at `http://localhost:8080`
2. Install required plugins: Terraform, Ansible, Azure CLI
3. Create new Pipeline job
4. Configure repository URL and Jenkinsfile path
5. Run the pipeline!

## 🔧 Manual Configuration (Post-Deployment)

After the automated pipeline completes, some manual steps are required for SSL and domain setup:

### Domain Configuration
```bash
# Add DNS A Record
# me.huzaifali.tech → YOUR_VM_PUBLIC_IP
# TTL: 3600
```

### SSL Certificate Setup
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate SSL certificate
sudo certbot --nginx -d me.huzaifali.tech

# Setup auto-renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet && /usr/bin/systemctl reload nginx" | sudo crontab -
```

### Verification Commands
```bash
# Check application status
pm2 status
sudo systemctl status nginx

# Test SSL configuration
curl -I https://me.huzaifali.tech
openssl s_client -connect me.huzaifali.tech:443
```

## 📊 Monitoring & Logging

### Application Monitoring
```bash
# PM2 process monitoring
pm2 status
pm2 logs nextjs-app
pm2 monit
```

### Server Monitoring
```bash
# NGINX logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System resources
htop
df -h
```

### SSL Certificate Monitoring
```bash
# Check certificate expiry
sudo certbot certificates

# Test renewal process
sudo certbot renew --dry-run
```

## 🛡️ Security Features

- **TLS 1.2/1.3 Only**: Modern encryption protocols
- **HSTS Headers**: Prevent protocol downgrade attacks
- **XSS Protection**: Cross-site scripting prevention
- **Content Security Policy**: Mitigate injection attacks
- **Automated Updates**: Security patches via Ansible
- **Firewall Configuration**: UFW with minimal required ports

## 🔄 CI/CD Pipeline Stages

1. **Source Code Checkout**: Pull latest code from Git repository
2. **Infrastructure Provisioning**: Terraform creates Azure VM and networking
3. **Server Configuration**: Ansible installs and configures software stack
4. **Application Deployment**: Deploy Next.js application with PM2
5. **Load Balancer Setup**: Configure NGINX reverse proxy
6. **SSL Certificate**: Generate and install Let's Encrypt certificates
7. **Health Checks**: Verify application accessibility and SSL configuration
8. **Cleanup**: Remove temporary files and optimize system

## 📈 Performance Optimizations

- **Static Asset Caching**: 1-year cache expiry for static files
- **Gzip Compression**: Reduce bandwidth usage
- **HTTP/2 Support**: Improved connection efficiency
- **Process Management**: PM2 clustering for better resource utilization
- **Database Connection Pooling**: Optimized database connections

## 🐛 Troubleshooting

### Common Issues

**DNS Not Propagating**
```bash
# Check DNS propagation
dig me.huzaifali.tech
nslookup me.huzaifali.tech
```

**SSL Certificate Issues**
```bash
# Recreate certificate
sudo certbot delete --cert-name me.huzaifali.tech
sudo certbot --nginx -d me.huzaifali.tech
```

**Application Not Starting**
```bash
# Check PM2 status
pm2 restart nextjs-app
pm2 logs --lines 50
```

**NGINX Configuration Errors**
```bash
# Test configuration
sudo nginx -t
sudo systemctl reload nginx
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Add monitoring with Prometheus and Grafana
- [ ] Implement blue-green deployment strategy
- [ ] Add automated testing in pipeline
- [ ] Database backup automation
- [ ] Multi-environment support (dev, staging, prod)
- [ ] Container orchestration with Kubernetes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Huzaifa Ali**
- Portfolio: [me.huzaifali.tech](https://huzaifali.tech/)
- GitHub: [@huzaifali](https://github.com/huzaifalidev)
- LinkedIn: [huzaifali](https://linkedin.com/in/huzaifali48)

## 🙏 Acknowledgments

- Azure Free Tier for hosting infrastructure
- Let's Encrypt for free SSL certificates
- Jenkins community for CI/CD platform
- Terraform and Ansible communities for IaC tools

---

⭐ **Star this repository if you found it helpful!**

*Last updated: June 2025*
