"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

export function FloatingElement({ 
  children, 
  delay = 0, 
  duration = 6, 
  distance = 20,
  className = "" 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingShape({ 
  size = 100, 
  color = "bg-blue-500/10", 
  delay = 0,
  className = ""
}: {
  size?: number
  color?: string
  delay?: number
  className?: string
}) {
  return (
    <FloatingElement delay={delay} className={className}>
      <div 
        className={`rounded-full blur-xl ${color}`}
        style={{ width: size, height: size }}
      />
    </FloatingElement>
  )
}
