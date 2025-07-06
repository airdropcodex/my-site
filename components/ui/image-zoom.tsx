"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ImageZoomProps {
  src: string
  alt: string
  className?: string
  zoomLevel?: number
}

export function ImageZoom({ src, alt, className = "", zoomLevel = 2 }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x, y })
  }

  return (
    <div
      ref={imageRef}
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="w-full h-full"
        animate={{
          scale: isZoomed ? zoomLevel : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
      
      {/* Zoom overlay indicator */}
      <motion.div
        className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm rounded-full p-1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isZoomed ? 1 : 0, 
          scale: isZoomed ? 1 : 0 
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-4 h-4 border border-white/60 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}
