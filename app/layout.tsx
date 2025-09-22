import type React from "react"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Celine Khaw - AI Console Terminal",
  description: "Blockchain & AI Builder | Hackathon Explorer | Trading Terminal Portfolio",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  )
}
