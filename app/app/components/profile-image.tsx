"use client"

import { useState } from "react"
import Image from "next/image"

interface ProfileImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export default function ProfileImage({ src, alt, width, height }: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-full max-w-sm perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative rounded-2xl overflow-hidden border bg-background transition-all duration-300 ease-out ${
          isHovered ? "rotate-y-10 scale-105 shadow-2xl" : "shadow-lg"
        }`}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 opacity-75 blur"></div>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover relative z-10"
          priority
        />
      </div>
    </div>
  )
}

