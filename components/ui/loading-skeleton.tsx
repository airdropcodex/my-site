"use client"

import { motion } from "framer-motion"

interface SkeletonProps {
  className?: string
  variant?: "text" | "rectangular" | "circular"
}

export function Skeleton({ className = "", variant = "rectangular" }: SkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 animate-pulse"
  
  const variantClasses = {
    text: "h-4 rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full aspect-square"
  }

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite"
      }}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4 p-6 border border-neutral-200 rounded-2xl">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" variant="text" />
        <Skeleton className="h-4 w-1/2" variant="text" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-20" variant="text" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
