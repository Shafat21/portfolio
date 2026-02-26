import React, { useState, useEffect } from "react"
import { GraduationCap, Calendar, Award, BookOpen, Sparkles } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { supabase } from "@/lib/supabase/client"

interface Education {
  id: string
  degree: string
  institution: string
  field_of_study: string | null
  start_date: string
  end_date: string | null
  current: boolean
  gpa: string | null
  description: string | null
  location: string | null
  icon_name: string | null
  order_index: number
}

const iconMap: Record<string, any> = {
  BookOpen,
  Award,
  GraduationCap,
}

const EducationCard = ({ edu, index }: { edu: Education; index: number }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { year: "numeric" })
  }

  const Icon = iconMap[edu.icon_name || "GraduationCap"] || GraduationCap
  const period = `${formatDate(edu.start_date)} — ${edu.current ? "Present" : (edu.end_date ? formatDate(edu.end_date) : "Present")}`

  // Format Mastery Score
  const getMasteryScore = (gpa: string | null) => {
    if (!gpa) return null
    const val = parseFloat(gpa)
    if (val > 5) return `${val}%` // Assume percentage if > 5
    return `${val} / 5.0`
  }

  const masteryScore = getMasteryScore(edu.gpa)

  return (
    <motion.div
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="relative h-full p-8 rounded-[2.5rem] bg-navy-800/40 backdrop-blur-3xl border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-coral-400/30 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col">
        {/* Holographic Light Reflection */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(247,155,114,0.06), transparent 80%)`
            ),
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-navy-900 border border-white/5 flex items-center justify-center text-coral-400 group-hover:scale-110 group-hover:text-lightgray-100 transition-all duration-500 shadow-inner">
              <Icon className="w-7 h-7" />
            </div>

            {masteryScore && (
              <div className="px-4 py-1.5 rounded-full bg-coral-400/10 border border-coral-400/20 text-[10px] font-black uppercase tracking-[0.2em] text-coral-400 flex items-center gap-2">
                <Sparkles className="w-3 h-3 animate-pulse" />
                {masteryScore}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-black text-lightgray-100 mb-2 tracking-tighter leading-tight group-hover:text-coral-400 transition-colors">
              {edu.degree}
            </h3>
            <p className="text-lightgray-300 text-sm font-bold uppercase tracking-widest opacity-80 mb-6">
              {edu.institution}
            </p>

            <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-lightgray-400 mb-6">
              <Calendar className="w-3.5 h-3.5 text-coral-400/60" />
              {period}
            </div>

            {edu.description && (
              <p className="text-lightgray-400 text-xs leading-relaxed opacity-60 line-clamp-2 italic">
                {edu.description}
              </p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-lightgray-500">
              Academic Background
            </span>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-coral-400/20 group-hover:bg-coral-400 transition-colors duration-500" style={{ transitionDelay: `${i * 100}ms` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Education() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data, error } = await supabase
          .from("education")
          .select("*")
          .order("order_index", { ascending: true })

        if (error) throw error
        setEducation(data || [])
      } catch (error) {
        console.error("Error fetching education:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEducation()
  }, [])

  if (!loading && education.length === 0) return null

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-navy-700">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_rgba(247,155,114,0.02),transparent_60%)] z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Education"
          subtitle="My academic background and professional certifications"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 max-w-6xl mx-auto">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-64 rounded-[2.5rem] bg-navy-800/40 border border-white/5 animate-pulse" />
            ))
          ) : (
            education.map((edu, index) => (
              <EducationCard key={edu.id} edu={edu} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
