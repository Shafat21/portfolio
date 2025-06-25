import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/app/components/Navigation"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata = {
  title: "Shafat Alam | Web Developer, FiveM ESX/QBCore Scripter & Discord Bot Expert",
  description:
    "Official portfolio of Shafat Alam — Full Stack Web Developer, UI/UX Designer, FiveM Developer (ESX/QBCore), and Discord Bot Creator. Offering responsive websites, Tebex stores, and game automation bots.",
  keywords: [
    "Shafat Alam",
    "Web Developer",
    "Web Designer",
    "Full Stack Developer",
    "UI UX Designer",
    "Next.js Developer",
    "React Developer",
    "Tailwind CSS",
    "WordPress Developer",
    "Custom WordPress Sites",
    "FiveM Developer",
    "FiveM ESX Scripter",
    "QBCore Developer",
    "Lua Developer",
    "FiveM Tebex Developer",
    "Discord Bot Developer",
    "Discord.js Bot",
    "Discord FiveM Bot",
    "Custom Discord Bots",
    "Gaming Website Designer",
    "Roleplay Server Developer",
    "GTA RP Developer",
    "Tebex Store Design",
    "Bot Automation",
    "Portfolio Website Developer"
  ],
  authors: [{ name: "Shafat Alam", url: "https://shafat21.dragondesignstudio.com" }],
  creator: "Shafat Alam",
  publisher: "Shafat Alam",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Shafat Alam | Full Stack Web & Game Development Services",
    description:
      "View the professional portfolio of Shafat Alam – expert in FiveM scripting, Discord bot automation, modern web design, and more.",
    url: "https://shafat21.dragondesignstudio.com",
    siteName: "Shafat21 Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shafat Alam Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shafat Alam | Web Developer, FiveM & Discord Expert",
    description:
      "Offering full stack development services including custom bots, gaming scripts, and responsive web design.",
    images: ["/og-image.png"],
    creator: "@shafatdev", // update if applicable
  },
  metadataBase: new URL("https://shafat21.dragondesignstudio.com"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: "https://shafat21.dragondesignstudio.com",
  },
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
