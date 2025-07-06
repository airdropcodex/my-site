"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { ReactNode, useRef } from "react"

interface RevealAnimationProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
}

const variants = {
  up: { y: 60, opacity: 0 },
  down: { y: -60, opacity: 0 },
  left: { x: 60, opacity: 0 },
  right: { x: -60, opacity: 0 }
}

export function RevealAnimation({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.6,
  className = "" 
}: RevealAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10%" 
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={variants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : variants[direction]}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ 
  children, 
  stagger = 0.1,
  className = "" 
}: {
  children: ReactNode
  stagger?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}
