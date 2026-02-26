"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, Calendar, MapPin, Zap } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"

type Experience = Database["public"]["Tables"]["experience"]["Row"]

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("experience")
          .select("*")
          .order("order_index", { ascending: true })

        if (error) throw error
        setExperiences(data || [])
      } catch (error) {
        console.error("Error fetching experience:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  const formatDateRange = (startDate: string, endDate: string | null, current: boolean) => {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
    const start = formatDate(startDate)
    const end = current ? 'Present' : (endDate ? formatDate(endDate) : 'Present')
    return `${start} - ${end}`
  }

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-navy-700">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral-400/20 to-transparent z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Experience" />

        <div className="max-w-4xl mx-auto mt-16 relative">
          {/* Main Timeline Backbone */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-coral-400/50 via-navy-800 to-transparent hidden sm:block"></div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-coral-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-12 md:space-y-24">
              {experiences.map((exp, index) => {
                const isEven = index % 2 === 0
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`relative flex items-center justify-between md:flex-row ${isEven ? "md:flex-row-reverse" : ""
                      } flex-col group`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-20 hidden sm:block">
                      <div className={`w-4 h-4 rounded-full border-2 ${exp.current ? 'bg-coral-400 border-white shadow-[0_0_15px_rgba(247,155,114,0.8)] animate-pulse' : 'bg-navy-800 border-coral-400'} group-hover:scale-125 transition-transform duration-300`}></div>
                    </div>

                    {/* Content Card */}
                    <div className="w-full md:w-[45%] pl-10 md:pl-0">
                      <div className={`p-8 rounded-[2rem] border border-white/5 bg-navy-800/40 backdrop-blur-xl group-hover:border-coral-400/30 transition-all duration-500 relative overflow-hidden`}>
                        {/* Glow Overlay */}
                        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,_rgba(247,155,114,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        <div className="relative z-10">
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-coral-400 font-bold px-3 py-1 bg-coral-400/10 rounded-full border border-coral-400/20">
                              {formatDateRange(exp.start_date, exp.end_date, exp.current)}
                            </span>
                            {exp.current && (
                              <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-green-400 px-3 py-1 bg-green-400/10 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                Currently Engaged
                              </span>
                            )}
                          </div>

                          <h3 className="text-2xl font-black text-lightgray-100 mb-1 group-hover:text-coral-400 transition-colors">
                            {exp.position}
                          </h3>
                          <div className="text-lightgray-300 text-sm font-bold flex items-center gap-2 mb-6">
                            <MapPin className="w-3 h-3 text-coral-400" />
                            {exp.company} {exp.location && `• ${exp.location}`}
                          </div>

                          <p className="text-lightgray-300 text-sm font-light leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                            {exp.description}
                          </p>

                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-md bg-navy-900/50 border border-white/5 text-lightgray-400 group-hover:border-coral-400/20 group-hover:text-lightgray-100 transition-all"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Spacer for Desktop Grid */}
                    <div className="hidden md:block w-[45%]"></div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
