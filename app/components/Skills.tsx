import React, { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Code, Database, Server, PencilRuler, FileText, Layers, Cloud, Network, Code2, Cpu } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { supabase } from "@/lib/supabase/client"
import type { Database as DB } from "@/lib/supabase/database.types"

type Skill = DB["public"]["Tables"]["skills"]["Row"]

const iconMap: Record<string, any> = {
  Code, Database, Server, PencilRuler, FileText, Layers, Cloud, Network, Code2, Cpu
}

const categoryTitles: Record<string, string> = {
  Frontend: "Frontend",
  Backend: "Backend",
  Database: "Database",
  DevOps: "Cloud",
  Design: "Creative",
  Other: "Tools",
}

const categoryDescriptions: Record<string, string> = {
  Frontend: "Modern UI/UX interfaces.",
  Backend: "Scalable server logic.",
  Database: "Efficient data structures.",
  DevOps: "Cloud & CI/CD pipelines.",
  Design: "Visual & Brand identity.",
  Other: "Custom scripts & tools.",
}

const BentoBox = ({ category, categorySkills }: { category: string; categorySkills: Skill[] }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const iconName = categorySkills[0]?.icon_name
  const Icon = (iconName && iconMap[iconName]) || Code

  return (
    <motion.div
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group p-6 rounded-[2rem] bg-navy-800/40 backdrop-blur-3xl border border-white/5 overflow-hidden hover:border-coral-400/30 transition-colors duration-500"
    >
      {/* Magnetic Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(247,155,114,0.1), transparent 80%)`
          ),
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-navy-900 border border-white/5 flex items-center justify-center text-coral-400 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-lightgray-100 uppercase tracking-tighter">{categoryTitles[category]}</h3>
            <p className="text-[10px] text-lightgray-400 uppercase font-bold tracking-[0.2em]">{categoryDescriptions[category]}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categorySkills.map((skill) => (
            <motion.span
              key={skill.id}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-3 py-1.5 rounded-lg bg-navy-900/50 border border-white/5 text-[11px] font-mono font-bold text-lightgray-300 hover:text-coral-400 hover:border-coral-400/20 transition-all cursor-default"
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(247,155,114,0.03),transparent_70%)] opacity-50 z-0"></div>
    </div>
  )
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("order_index", { ascending: true })

        if (error) throw error
        setSkills(data || [])
      } catch (error) {
        console.error("Error fetching skills:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const categories = ["Frontend", "Backend", "Database", "DevOps", "Design", "Other"]

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-navy-700">
      <AnimatedBackground />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Skills & Tools" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-7xl mx-auto">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-[2rem] bg-navy-800/40 border border-white/5 animate-pulse" />
            ))
          ) : (
            categories.map((cat) => (
              <BentoBox
                key={cat}
                category={cat}
                categorySkills={skills.filter((s) => s.category === cat)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
