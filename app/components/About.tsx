"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Code, Database, Server, Brain, Settings, Briefcase, Star, User } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { supabase } from "@/lib/supabase/client"

// Particle animation component
const ParticleField = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-coral-400/30"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default function About() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    yearsOfExperience: 0,
    totalTestimonials: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total projects count
        const { count: projectsCount } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })

        // Fetch experience to calculate years
        const { data: experienceData } = await supabase
          .from("experience")
          .select("start_date")
          .order("start_date", { ascending: true })
          .limit(1) as { data: { start_date: string }[] | null }

        // Fetch testimonials count
        const { count: testimonialsCount } = await supabase
          .from("testimonials")
          .select("*", { count: "exact", head: true })
          .eq("published", true)

        // Calculate years of experience from earliest start date
        let years = 5 // Default fallback
        if (experienceData && experienceData.length > 0 && experienceData[0]?.start_date) {
          const earliestDate = new Date(experienceData[0].start_date as string)
          const now = new Date()
          years = Math.max(1, now.getFullYear() - earliestDate.getFullYear())
        }

        setStats({
          totalProjects: projectsCount || 0,
          yearsOfExperience: years,
          totalTestimonials: testimonialsCount || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  const experiences = [
    {
      label: "Experience",
      value: `${stats.yearsOfExperience}+ Years`,
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      label: "Projects",
      value: `${stats.totalProjects}+ Done`,
      icon: <Star className="w-5 h-5" />
    },
    {
      label: "Testimonials",
      value: `${stats.totalTestimonials} Reviews`,
      icon: <User className="w-5 h-5" />
    },
  ]

  const bentoItems = [
    {
      title: "About My Work",
      content: "I don't just write code; I build worlds. My journey started with a curiosity for how digital things work, and it quickly evolved into an obsession for creating experiences that leave a lasting impact. Whether I'm architecting a high-performance web application or engineering a complex, living ecosystem for FiveM, I approach every line of code with the mindset of a storyteller. To me, it's not just about syntax or performance—it's about the feeling someone gets when they interact with something that works flawlessly and looks beautiful. I'm a developer by trade, but at my core, I'm a builder who loves the challenge of turning a blank screen into something meaningful and alive.",
      className: "col-span-12 md:col-span-8 row-span-1 md:row-span-2",
      icon: <Brain className="w-8 h-8 text-coral-400" />,
      gradient: "from-coral-400/10 to-transparent"
    },
    {
      title: "Core Stack",
      content: "Next.js, TypeScript, Node.js, Python, MongoDB",
      className: "col-span-12 md:col-span-4",
      icon: <Code className="w-6 h-6 text-lightgray-300" />,
      gradient: "from-blue-400/10 to-transparent"
    },
    {
      title: "FiveM Expert",
      content: "Crafting optimized scripts, custom UIs, and complex server architectures for elite roleplay communities.",
      className: "col-span-12 md:col-span-4",
      icon: <Server className="w-6 h-6 text-coral-400" />,
      gradient: "from-orange-400/10 to-transparent"
    },
    {
      title: "Backend Development",
      content: "Building robust APIs and scalable cloud infrastructures using modern, secure practices.",
      className: "col-span-12 md:col-span-4",
      icon: <Database className="w-6 h-6 text-lightgray-300" />,
      gradient: "from-green-400/10 to-transparent"
    },
    {
      title: "Execution",
      content: "From wireframes to production-ready products. I focus on clean code and pixel-perfect design.",
      className: "col-span-12 md:col-span-4",
      icon: <Settings className="w-6 h-6 text-coral-400" />,
      gradient: "from-purple-400/10 to-transparent"
    }
  ]

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-navy-700">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(247,155,114,0.05),transparent_50%)] z-0"></div>
      <ParticleField />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="About Me" />

        <div className="grid grid-cols-12 gap-6 mt-12">
          {bentoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-8 rounded-[2rem] border border-white/5 bg-navy-800/40 backdrop-blur-xl group hover:border-coral-400/20 transition-all duration-500 relative overflow-hidden ${item.className}`}
            >
              {/* Tile Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

              <div className="relative z-10">
                <div className="bg-navy-900/50 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 mb-6 group-hover:scale-110 group-hover:bg-coral-400/10 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-lightgray-100 mb-4 group-hover:text-coral-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-lightgray-300 text-lg font-light leading-relaxed">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Quick Experience Stats Tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-4 p-8 rounded-[2rem] border border-coral-400/20 bg-gradient-to-br from-coral-400/10 to-transparent backdrop-blur-xl flex flex-col justify-center gap-8"
          >
            {experiences.map((exp, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-coral-400/20 flex items-center justify-center text-coral-400">
                  {exp.icon}
                </div>
                <div>
                  <div className="text-2xl font-black text-lightgray-100 leading-none">{exp.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-coral-400 font-bold mt-1">{exp.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
