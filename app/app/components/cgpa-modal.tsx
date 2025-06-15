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

interface CGPAModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CGPAModal({ open, onOpenChange }: CGPAModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const projectImages: ProjectImage[] = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/splash-icon-0rhhsBtGLGVL19umbEg0etFCsIPjZy.png",
      title: "CGPA Calculator",
      description: "Modern splash screen with dynamic educational elements",
      category: "main",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-blPwZq8T1cDmcUpqqxdnOZnX9OhEpa.png",
      title: "Course List",
      description: "Main interface showing multiple courses with their credits and grades",
      category: "main",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-4hdqtG3iApKP5u9Ooubv8C9nLTUohd.png",
      title: "GPA Result",
      description: "Popup showing the calculated GPA result (3.50)",
      category: "result",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-m3Wy9iXEjDPOSQOtEeTIzRFmthExsi.png",
      title: "New Course Entry",
      description: "Empty form for adding a new course with default values",
      category: "input",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-ZfpOkUwkF0J7D4HAN1NZgChOU9X8I5.png",
      title: "Grade Selection",
      description: "Dropdown menu for selecting course grades from A+ to C-",
      category: "input",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-Vjz9eXo8eDJlxpY9rPv1gNAxWDWsZj.png",
      title: "Credit Hours",
      description: "Credit hours selection with options 1-3",
      category: "input",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-gJUCmThzSOm7JYSXxgJc1jSZvpSe6W.png",
      title: "Validation",
      description: "Error message showing course name validation",
      category: "validation",
    },
  ]

  const categories = [
    { id: "all", label: "All" },
    { id: "main", label: "Main View" },
    { id: "input", label: "Input Options" },
    { id: "result", label: "Results" },
    { id: "validation", label: "Validation" },
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
          <DialogTitle className="text-2xl font-bold">CGPA Calculator App</DialogTitle>
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

