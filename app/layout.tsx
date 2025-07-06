import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/AuthProvider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ElectroStore - Premium Electronics Store",
  description:
    "Shop premium home appliances including air conditioners, refrigerators, TVs, ovens, freezers, and washing machines. Best prices in Bangladesh, quality guaranteed.",
  keywords:
    "electronics, appliances, air conditioner, refrigerator, TV, oven, washing machine, home appliances, Bangladesh",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  )
}
