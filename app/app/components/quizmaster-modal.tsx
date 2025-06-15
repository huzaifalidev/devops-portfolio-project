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

interface QuizMasterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function QuizMasterModal({ open, onOpenChange }: QuizMasterModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const projectImages: ProjectImage[] = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-27%20140922-2auuDp2XZk0lYE6b8Zl23TcRqi9H4q.png",
      title: "Landing Page",
      description: "Modern landing page showcasing the platform's main features",
      category: "marketing",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20103934-mOZTdhGWQJiLH5oJlPQEQq5qxGSiar.png",
      title: "Dashboard Overview",
      description: "Organization dashboard with key metrics and recent activity",
      category: "dashboard",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20104011-07SRo9pzyvbBba8kWzkGq2CP7Ozwk0.png",
      title: "Teacher Management",
      description: "Interface for adding and managing teachers in the organization",
      category: "management",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20105810-WiyFhteSHmNdm0nfjkIKlpuowZsg30.png",
      title: "Quiz Interface",
      description: "Interactive quiz with multiple choice questions and timer",
      category: "quiz",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20105837-UalK5aYzea1Ho8VsZo6NNOZx7X8ptd.png",
      title: "Quiz Results",
      description: "Detailed results page showing performance and anti-cheating measures",
      category: "quiz",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20113129-8FupcjSdwDso6iyDYs49ET4eBDShbb.png",
      title: "Organization Signup",
      description: "Registration form for new organizations to join the platform",
      category: "auth",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20104502-cr5FVLH4ssRppunnR5h4sDAEAgBJxS.png",
      title: "Quiz Management",
      description: "Interface for creating and managing quizzes and courses",
      category: "management",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20105142-lZbScgqK3KT97BwjIbBKliO3KbIE1c.png",
      title: "Academic Performance",
      description: "Student performance tracking with grade distribution",
      category: "analytics",
    },
  ]

  const categories = [
    { id: "all", label: "All" },
    { id: "marketing", label: "Marketing" },
    { id: "dashboard", label: "Dashboard" },
    { id: "management", label: "Management" },
    { id: "quiz", label: "Quiz" },
    { id: "auth", label: "Authentication" },
    { id: "analytics", label: "Analytics" },
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
      <DialogContent className="sm:max-w-3xl md:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">QuizMaster SaaS Platform</DialogTitle>
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
          {/* Screenshot container */}
          <div className="relative mx-auto w-full">
            <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={filteredImages[currentImageIndex].url || "/placeholder.svg"}
                  alt={filteredImages[currentImageIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
              onClick={previousImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
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

