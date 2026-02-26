import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  ExternalLink,
  Github,
  Globe,
  Sparkles,
  BookOpen,
  Car,
  Heart,
  Laptop,
  Server,
  FileCode,
  Flame,
  Users,
  Pill,
  Code,
  Brain,
  Rocket,
  ArrowRight
} from "lucide-react"
import SectionHeading from "./SectionHeading"
import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"

type Project = Database["public"]["Tables"]["projects"]["Row"]

const iconMap: Record<string, any> = {
  BookOpen, Brain, Globe, Code, Car, Heart, Users, Pill, Server, Flame, Rocket
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const Icon = iconMap[project.icon_name || "Code"] || Code

  return (
    <motion.div
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="relative h-full p-8 rounded-[2.5rem] bg-navy-800/40 backdrop-blur-3xl border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-coral-400/30 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
        {/* Holographic Light Reflection */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(247,155,114,0.08), transparent 80%)`
            ),
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-navy-900 border border-white/5 flex items-center justify-center text-coral-400 group-hover:scale-110 group-hover:text-lightgray-100 transition-all duration-500 shadow-inner">
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex flex-col items-end gap-2">
              {project.pinned && (
                <span className="px-3 py-1 rounded-full bg-coral-400/10 border border-coral-400/20 text-[9px] font-black uppercase tracking-widest text-coral-400 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-coral-400 animate-pulse"></div>
                  Priority
                </span>
              )}
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-lightgray-400 flex items-center gap-1.5">
                  <Sparkles className="w-2.5 h-2.5" />
                  Featured
                </span>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-black text-lightgray-100 mb-3 tracking-tighter group-hover:text-coral-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-lightgray-300 text-sm font-medium leading-relaxed opacity-80 mb-6 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech_stack?.split(",").map((tech, i) => (
                <span key={i} className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded bg-navy-900/50 border border-white/5 text-lightgray-400 group-hover:text-lightgray-200 group-hover:border-coral-400/20 transition-all">
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.link || project.github_link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-4 rounded-xl bg-navy-900/80 border border-white/5 text-lightgray-100 group-hover:bg-coral-400 group-hover:text-navy-900 transition-all duration-500 font-black text-[10px] uppercase tracking-[0.2em]"
          >
            <span>Explore Project</span>
            {project.type === "github" ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: "Web", label: "Web Apps", icon: Globe },
    { id: "FiveM", label: "FiveM", icon: Car },
    { id: "Python", label: "Python", icon: FileCode },
    { id: "IoT", label: "IoT", icon: Laptop },
  ]

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order_index", { ascending: true })

        if (error) throw error
        setProjects(data || [])
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    if (a.featured && !b.featured) return -1
    return 0
  })

  const filteredProjects = activeCategory
    ? sortedProjects.filter((project) => project.category === activeCategory)
    : sortedProjects

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-navy-700">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(247,155,114,0.03),transparent_70%)] opacity-50 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Latest Projects"
          subtitle="A showcase of my recent work in web development, FiveM, and automation"
        />

        {/* Minimal Pill Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-12 mb-16">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${activeCategory === null
              ? "bg-coral-400 border-coral-400 text-navy-900 shadow-[0_0_20px_rgba(247,155,114,0.3)]"
              : "bg-navy-800 border-white/5 text-lightgray-400 hover:border-coral-400/30 hover:text-lightgray-100"
              }`}
          >
            All Projects
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border flex items-center gap-2 ${activeCategory === cat.id
                ? "bg-coral-400 border-coral-400 text-navy-900 shadow-[0_0_20px_rgba(247,155,114,0.3)]"
                : "bg-navy-800 border-white/5 text-lightgray-400 hover:border-coral-400/30 hover:text-lightgray-100"
                }`}
            >
              <cat.icon className="w-3 h-3" />
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[400px] rounded-[2.5rem] bg-navy-800/40 border border-white/5 animate-pulse" />
              ))
            ) : (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
