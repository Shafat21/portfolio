import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/app/components/Navigation"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata = {
  title: "Shafat Alam | Web Designer, FiveM ESX/QBCore Developer & Discord Bot Expert",
  description:
    "Explore the portfolio of Shafat Alam — full-stack web developer, FiveM (ESX & QBCore) developer, custom Discord bot creator, and UI/UX designer. Offering services in web design, WordPress development, FiveM scripting, and Discord integrations.",
  keywords: [
    "Shafat Alam",
    "Web Developer",
    "Web Designer",
    "UI/UX Designer",
    "Frontend Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Tailwind Developer",
    "WordPress Developer",
    "FiveM Developer",
    "FiveM ESX Developer",
    "FiveM QBCore Developer",
    "Lua Developer",
    "Discord Bot Developer",
    "Custom Discord Bots",
    "Discord FiveM Bots",
    "Discord.js",
    "Bot Developer",
    "Tebex Store Design",
    "Gaming Community Developer",
    "Portfolio Website",
    "Creative Developer",
    "Modern UI Developer",
    "GTA RP Developer",
    "GSRP Developer",
    "Automation Developer"
  ],
  authors: [{ name: "Shafat Alam", url: "https://shafat21.dragondesignstudio.com" }],
  creator: "Shafat Alam",
  publisher: "Shafat Alam",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Shafat Alam | Web & Game Developer Portfolio",
    description:
      "Web, FiveM & Discord Bot Developer — Explore professional services in UI design, ESX scripting, and full-stack development.",
    url: "https://shafat21.dragondesignstudio.com",
    siteName: "Shafat Alam Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shafat Alam Portfolio OpenGraph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shafat Alam | Full Stack Web & Game Developer",
    description:
      "Portfolio of Shafat Alam – offering professional FiveM, web, and bot development services.",
    images: ["/og-image.png"],
    creator: "@shafat21", // update if applicable
  },
  metadataBase: new URL("https://shafat21.dragondesignstudio.com"),
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-navy-700 text-lightgray-100`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
