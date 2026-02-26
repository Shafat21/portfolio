"use client"

import Hero from "./components/Hero"
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

  return (
    <main className="bg-navy-700 min-h-screen">
      <ThreeScene />
      <Hero />
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
