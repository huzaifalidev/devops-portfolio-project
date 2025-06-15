"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github, Smartphone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import ProjectModal from "./project-modal"
import CGPAModal from "./cgpa-modal"
import QuizMasterModal from "./quizmaster-modal"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  showModal?: boolean
  isMobileApp?: boolean
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  tags,
  showModal,
  isMobileApp,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Card
        className="overflow-hidden group transition-all duration-300 hover:shadow-lg border-muted hover:border-primary/20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => showModal && setModalOpen(true)}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {isMobileApp && (
            <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground rounded-full p-1.5">
              <Smartphone className="h-4 w-4" />
            </div>
          )}

          {showModal && (
            <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-800/90 text-foreground rounded-full px-3 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
              <Smartphone className="h-3 w-3" />
              View Screenshots
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </Link>
        </CardFooter>
      </Card>
      {showModal &&
        (title === "CGPA Calculator" ? (
          <CGPAModal open={modalOpen} onOpenChange={setModalOpen} />
        ) : title.includes("QuizMaster") ? (
          <QuizMasterModal open={modalOpen} onOpenChange={setModalOpen} />
        ) : (
          <ProjectModal open={modalOpen} onOpenChange={setModalOpen} />
        ))}
    </>
  )
}

