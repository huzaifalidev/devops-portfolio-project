"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProjectImage {
  url: string
  title: string
  description: string
  category: string
}

interface ProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProjectModal({ open, onOpenChange }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const projectImages: ProjectImage[] = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SplashScreen-Vj4qGuiVsCohOyhxOKy1nyv8pcfhz8.png",
      title: "Splash Screen",
      description: "Initial loading screen with TaskMate branding",
      category: "onboarding",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Role-KsTEOHKzNhPnOBMHZjTKs3FSzFWvZb.png",
      title: "Role Selection",
      description: "Users can choose to continue as a Client or Service Provider",
      category: "onboarding",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Login-n6aClBnT2LqOtvs8w8peGPisr3kjx6.png",
      title: "Login",
      description: "Secure login screen with email and password authentication",
      category: "auth",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Forget%20Password-wohtf2Y3hTuZRLby06KldPMApmAVlX.png",
      title: "Forgot Password",
      description: "Password recovery through email verification",
      category: "auth",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OTP-gYxgREOzaeypD4i3yLaOEwM95FcnWn.png",
      title: "Verification",
      description: "OTP verification screen for secure account access",
      category: "auth",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SignUp-CTttfgc6v1LWWP0xZQa2589WcMVTYX.png",
      title: "Sign Up",
      description: "Complete registration form for new users",
      category: "auth",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UserProfileClient-31USAk4XDNzExg3QyJSvCSgh5iE2Na.png",
      title: "Client Profile",
      description: "Client user profile with personal information and settings",
      category: "profile",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UserProfileSP-nhYsVMgjPT9qzNOIOqDlO1xHxquGS9.png",
      title: "Service Provider Profile",
      description: "Service provider profile with portfolio section",
      category: "profile",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Task-Create-kYDfvExisCMAhDaCa090LzhpOKCym3.png",
      title: "Create Task",
      description: "Form to create new tasks with title, description, and fare details",
      category: "tasks",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HomeServiceProvider-W3UaLVRwOMQsBmmoRmFPlYGyCOJ1Df.png",
      title: "Task Details",
      description: "Detailed task view with client info, fare, and action buttons",
      category: "tasks",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CreatePortfolio-tTprmK3EkkYdX5Rk08FRKVagiE6AuM.png",
      title: "Create Portfolio",
      description: "Service providers can create their portfolio with skills and certifications",
      category: "profile",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UpdatePassword-0AyewJxuHopFsdz0PpodbFgU4ynPDs.png",
      title: "Update Password",
      description: "Secure password update form with validation",
      category: "auth",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logout-HFfqgZOCxZwymQy9OCtM4561VvMgN0.png",
      title: "Logout Confirmation",
      description: "Modal to confirm user logout",
      category: "auth",
    },
  ]

  const categories = [
    { id: "all", label: "All" },
    { id: "onboarding", label: "Onboarding" },
    { id: "auth", label: "Authentication" },
    { id: "profile", label: "Profile" },
    { id: "tasks", label: "Tasks" },
  ]

  const filteredImages =
    selectedCategory === "all" ? projectImages : projectImages.filter((img) => img.category === selectedCategory)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">TaskMate Mobile App</DialogTitle>
          <div className="flex gap-2 overflow-x-auto py-2 px-1 -mx-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id)
                  setCurrentImageIndex(0)
                }}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center mt-4">
          {/* Phone frame */}
          <div className="relative mx-auto">
            <div className="relative w-[280px] md:w-[320px] rounded-[36px] bg-gray-800 p-2 shadow-xl">
              {/* Phone notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
                <div className="w-40 h-6 bg-gray-800 rounded-b-xl"></div>
              </div>

              {/* Screen */}
              <div className="relative overflow-hidden rounded-[28px] bg-white aspect-[9/19]">
                <Image
                  src={filteredImages[currentImageIndex].url || "/placeholder.svg"}
                  alt={filteredImages[currentImageIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-1 inset-x-0 flex justify-center">
                <div className="w-24 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
              onClick={previousImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Image info and pagination */}
          <div className="text-center mt-6">
            <h3 className="font-semibold text-lg">{filteredImages[currentImageIndex].title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{filteredImages[currentImageIndex].description}</p>
            <div className="flex justify-center gap-1.5 mt-4">
              {filteredImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View ${filteredImages[index].title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

