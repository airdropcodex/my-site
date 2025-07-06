"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Play, Truck, Headphones, Shield, Users, Star, Sparkles } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { RevealAnimation, StaggerContainer } from "@/components/ui/reveal-animation"
import { FloatingShape } from "@/components/ui/floating-elements"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function HeroSection() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  const x1 = useTransform(springX, (value) => value * 0.01)
  const y1 = useTransform(springY, (value) => value * 0.01)
  const x2 = useTransform(springX, (value) => value * -0.005)
  const y2 = useTransform(springY, (value) => value * -0.005)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-indigo-50/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 rounded-full px-4 py-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">Premium Electronics Collection</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight">
                <span className="block text-neutral-900">Premium</span>
                <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                  Electronics
                </span>
                <span className="block text-neutral-700 text-4xl lg:text-5xl font-light mt-2">for Modern Life</span>
              </h1>

              <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                Discover cutting-edge appliances that combine innovative technology with elegant design. Transform your
                home with our curated collection of premium electronics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-neutral-200 hover:border-neutral-300 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-2xl transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-neutral-600 font-medium">4.9 from 2,500+ reviews</span>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <Truck className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-neutral-900">Free Delivery</h3>
                      <p className="text-neutral-600">On orders over $500</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <Headphones className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-neutral-900">24/7 Support</h3>
                      <p className="text-neutral-600">Expert assistance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <Shield className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-neutral-900">Warranty</h3>
                      <p className="text-neutral-600">2-year coverage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-0 shadow-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <Users className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl">50K+</h3>
                      <p className="text-indigo-100">Happy Customers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
