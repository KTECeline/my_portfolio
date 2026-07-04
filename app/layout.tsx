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
  title: "Celine Khaw — AI Engineer",
  description:
    "AI engineer focused on LLM systems — fine-tuning, RAG, and backend that ships. CS (AI) @ APU, previously AI Engineer at FINDOC.",
  openGraph: {
    title: "Celine Khaw — AI Engineer",
    description: "AI engineer focused on LLM systems — fine-tuning, RAG, and backend that ships.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  )
}
