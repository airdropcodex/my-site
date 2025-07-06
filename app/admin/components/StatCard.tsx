"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"

interface StatCardProps {
  title: string
  value: number
  change?: number
  changeType?: "increase" | "decrease"
  prefix?: string
  suffix?: string
  icon: React.ReactNode
  gradient: string
  index?: number
}

export default function StatCard({
  title,
  value,
  change,
  changeType = "increase",
  prefix = "",
  suffix = "",
  icon,
  gradient,
  index = 0
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative group">
        {/* Gradient Background */}
        <div className={`absolute inset-0 ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-600">{title}</p>
              <div className="flex items-baseline space-x-2">
                <AnimatedCounter
                  from={0}
                  to={value}
                  prefix={prefix}
                  suffix={suffix}
                  className="text-3xl font-bold text-neutral-900"
                />
                {change !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`flex items-center text-sm font-medium ${
                      changeType === "increase" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {changeType === "increase" ? (
                      <ArrowUpIcon className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(change)}%
                  </motion.div>
                )}
              </div>
            </div>
            
            <motion.div
              className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center text-white shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon}
            </motion.div>
          </div>
          
          {/* Progress Bar */}
          <motion.div
            className="mt-4 w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className={`h-full ${gradient} rounded-full`}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(100, (value / 1000) * 100)}%` }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}