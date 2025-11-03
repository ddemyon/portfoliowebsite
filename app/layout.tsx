import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Delaney Demyon — Portfolio",
  description: "Third-year Cognitive Science & BMEC at UCSC. UX case studies and data projects.",
  generator: "v0.app",
  openGraph: {
    type: "website",
    title: "Delaney Demyon — Portfolio",
    description: "Third-year Cognitive Science & BMEC at UCSC. UX case studies and data projects.",
    images: ["/assets/headshot.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delaney Demyon — Portfolio",
    description: "Third-year Cognitive Science & BMEC at UCSC. UX case studies and data projects.",
    images: ["/assets/headshot.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0b1c31" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
