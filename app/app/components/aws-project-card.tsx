"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AWSProjectCardProps {
  title?: string
  description?: string
  image?: string
  link?: string
  tags?: string[]
}

export default function AWSProjectCard({
  title = "Multi-tier HA & Scalable AWS Infrastructure",
  description = "Deployed a highly available and scalable web application on AWS EC2 instances with Elastic Load Balancer, utilizing multiple availability zones for high reliability and fault tolerance.",
  image = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AWS%203in1%20Final%20project%20%28V1.0%29_page-0001.jpg-l7NdZtjVJBbe9zVHaBzVLd5Zl8x8R5.jpeg",
  link = "https://github.com/huzaifalidev",
  tags = ["AWS", "EC2", "RDS", "VPC", "Load Balancer", "Auto Scaling", "High Availability"],
}: AWSProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Card
        className="overflow-hidden group transition-all duration-300 hover:shadow-lg border-muted hover:border-primary/20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </Link>
        </CardFooter>
      </Card>
      <Dialog open={modalOpen} onOpenChange={(open) => setModalOpen(open)}>
        <DialogContent className="sm:max-w-3xl md:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="relative mx-auto w-full">
              <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
                <div className="relative aspect-[16/9] w-full">
                  <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain" priority />
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

