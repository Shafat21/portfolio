"use client"

import React, { useState, useEffect } from "react"
import Hero from "./components/Hero"
import HeroUnique from "./components/HeroUnique"
import About from "./components/About"
import Experience from "./components/Experience"
import Skills from "./components/Skills"
import Education from "./components/Education"
import Contact from "./components/Contact"
import Projects from "./components/Projects"
import Languages from "./components/Languages"
import ThreeScene from "./components/ThreeScene"
import FiveM from "./components/FiveM"
import Testimonials from "./components/Testimonials"
import { useSupabaseKeepalive } from "@/hooks/useSupabaseKeepalive"

export default function Home() {
  // Keep Supabase database active
  useSupabaseKeepalive()

  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return <main className="bg-navy-700 min-h-screen" />

  return (
    <main className="bg-navy-700 min-h-screen">
      <ThreeScene />
      {isMobile ? <Hero /> : <HeroUnique />}
      <About />
      <Experience />
      <Skills />
      <FiveM />
      <Projects />
      <Testimonials />
      <Education />
      <Languages />
      <Contact />
    </main>
  )
}
