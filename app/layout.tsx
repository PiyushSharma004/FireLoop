import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "🔥 FireLoop - Emotion-Aware Streaming",
  description: "Smart streaming interface with AI-powered mood detection and personalized recommendations",
  keywords: ["streaming", "AI", "mood detection", "entertainment", "FireLoop"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
