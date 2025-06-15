"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter, Phone } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import { ThemeToggle } from "@/components/theme-toggle"
import ProfileImage from "./components/profile-image"
import EducationTree from "./components/education-tree"
import ExperienceTimeline from "./components/experience-timeline"
import WhatsAppModal from "./components/whatsapp-modal"
import { useState } from "react"
import LicensesSection from "./components/licenses-section"
import AWSProjectCard from "./components/aws-project-card"

const educationItems = [
  {
    title: "Bachelor of Computer Science",
    institution: "SZABIST University",
    period: "01/2021 - Present",
  },
  {
    title: "Modern Web Application",
    institution: "SMIT Karachi",
    period: "09/2024 - Present",
  },
  {
    title: "AWS Cloud",
    institution: "SHERDIL IT Karachi",
    period: "05/2024 - 09/2024",
  },
]

const experienceItems = [
  {
    title: "Software Engineer",
    company: "SAYLANI TECH LIMITED",
    location: "Karachi, Pakistan",
    period: "10/2024 - Present",
    responsibilities: [
      "Led Development Team: Managed frontend and backend development, ensuring smooth project execution.",
      "Project & Task Management: Organized meetings, assigned tasks, and tracked progress.",
      "GitHub Management: Handled version control, code reviews, and collaboration.",
      "UI/UX Improvements: Enhanced design for a better user experience.",
      "Backend Development: Built secure and scalable APIs using Node.",
      "Presentations & Reports: Provided updates to stakeholders and team members.",
      "Deployment & Maintenance: Managed deployment, performance tuning, and system optimization.",
    ],
  },
  {
    title: "Intern Software Engineer",
    company: "AFROZE TEXTILE",
    location: "Karachi, Pakistan",
    period: "06/2024 - 08/2024",
    responsibilities: [
      "Supported the IT team by troubleshooting network issues, setting up hardware, and ensuring smooth IT operations.",
      "Learned key concepts like resource management, troubleshooting, and optimizing performance in an on-premises environment.",
      "Gained hands-on experience in managing physical servers, networks, and systems.",
    ],
  },
]

export default function Page() {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link className="flex items-center space-x-2" href="/">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                H
              </div>
              <span className="hidden font-bold sm:inline-block">Huzaifa Ali</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="#about" className="transition-colors hover:text-primary">
                About
              </Link>
              <Link href="#projects" className="transition-colors hover:text-primary">
                Projects
              </Link>
              <Link href="#tech" className="transition-colors hover:text-primary">
                Tech Stack
              </Link>
              <Link href="#contact" className="transition-colors hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" className="hidden sm:flex gap-2 items-center" asChild>
              <Link
                href="https://drive.google.com/uc?export=download&id=103mDiCMmzo79pjQziHNryPwtgupkHS94"
                download="Huzaifa_Ali_Resume.pdf"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-6-6z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 3v6h6M9 13h6M9 17h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Resume
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5 z-0"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  🟢 Available for freelance work
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl/none">
                  <span className="block">Hi, I'm Huzaifa Ali</span>
                  <span className="block mt-2 text-primary">Full Stack Developer</span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Building digital experiences with modern technologies. Focused on creating elegant solutions to
                  complex problems with a passion for clean code and user-centered design.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="rounded-full"
                    onClick={() => {
                      const projectsSection = document.getElementById("projects")
                      if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    View Projects
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full" onClick={scrollToContact}>
                    Contact Me
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <Link href="https://github.com/huzaifalidev" target="_blank">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com/in/huzaifa-ali-09aa38247" target="_blank">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href="https://x.com/Aleekhan_48" target="_blank">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </Link>
                  <Link href="mailto:huzaifalikhan48@gmail.com">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                    onClick={() => setWhatsappModalOpen(true)}
                  >
                    <Phone className="h-5 w-5" />
                    <span className="sr-only">WhatsApp</span>
                  </Button>
                </div>
              </div>
              <ProfileImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HuzaifaDp.jpg-Q2HbmbTIASKMMO8X86orUJseFD8Wxn.jpeg"
                alt="Huzaifa Ali"
                width={400}
                height={600}
              />
            </div>
          </div>
        </section>

        <section id="education" className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-12 text-center">Education</h2>
            <EducationTree items={educationItems} />
          </div>
        </section>

        <section id="experience" className="py-20 md:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                Career
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Professional Experience</h2>
              <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                My journey as a developer, showcasing roles and responsibilities in various organizations.
              </p>
            </div>
            <ExperienceTimeline items={experienceItems} />
          </div>
        </section>

        <LicensesSection />

        <section id="projects" className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                Portfolio
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Projects</h2>
              <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                A collection of my recent work showcasing my skills and expertise in web development.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="TaskMate (FYP)"
                description="TaskMate is mobile application connects clients with skilled Service Providers like plumbers, electricians, and mechanics."
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SplashScreen-Vj4qGuiVsCohOyhxOKy1nyv8pcfhz8.png"
                link="https://github.com/huzaifalidev"
                tags={["React Native", "Node.js", "MongoDB", "Figma", "SRS"]}
                showModal={true}
                isMobileApp={true}
              />
              <ProjectCard
                title="CGPA Calculator"
                description="A mobile app for calculating university CGPA with dynamic course addition, grade selection, and real-time GPA calculation."
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/splash-icon-0rhhsBtGLGVL19umbEg0etFCsIPjZy.png"
                link="https://github.com/huzaifalidev"
                tags={["React Native", "JavaScript", "Mobile UI/UX"]}
                showModal={true}
                isMobileApp={true}
              />
              <ProjectCard
                title="QuizMaster : SaaS-Based Quiz Platform"
                description="QuizMaster is an AI-powered SaaS quiz platform for education, training, and assessments. It lets organizations create, manage, and deliver smart quizzes with AI-generated questions, strict anti-cheating (tab switch detection, proctoring), and detailed performance reports."
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-27%20140922-2auuDp2XZk0lYE6b8Zl23TcRqi9H4q.png"
                link="https://github.com/huzaifalidev"
                tags={["Next.js", "TailwindCSS", "Node.js", "MongoDB", "Oracle Cloud", "Nginx", "Docker", "CI/CD"]}
                showModal={true}
                isMobileApp={false}
              />

              <AWSProjectCard />
            </div>
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  window.open("https://github.com/huzaifalidev", "_blank")
                }}
              >
                View All Projects
              </Button>
            </div>
          </div>
        </section>

        <section id="tech" className="py-20 md:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                Skills
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Tech Stack</h2>
              <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Technologies and tools I use to bring products to life.
              </p>
            </div>
            <TechStack />
          </div>
        </section>

        <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-background z-0"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-col items-center justify-center text-center mb-12">
                <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                  Contact
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Get in Touch</h2>
                <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                  Have a project in mind or just want to say hello? Feel free to reach out.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/20">
        <div className="container py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <Link className="flex items-center space-x-2" href="/">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  H
                </div>
                <span className="font-bold">Huzaifa Ali </span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                Full stack developer specializing in building exceptional digital experiences.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Pages</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#projects" className="text-sm text-muted-foreground hover:text-foreground">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Social</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="https://github.com/huzaifalidev"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://linkedin.com/in/huzaifa-ali-09aa38247"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://x.com/Aleekhan_48"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setWhatsappModalOpen(true)}
                      className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      WhatsApp
                    </button>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">© 2025 Huzaifa Ali. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="https://github.com/huzaifalidev" className="text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/huzaifa-ali-09aa38247"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://x.com/Aleekhan_48" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <button
                onClick={() => setWhatsappModalOpen(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                <span className="sr-only">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppModal open={whatsappModalOpen} onOpenChange={setWhatsappModalOpen} phoneNumber="923043923901" />
    </div>
  )
}

