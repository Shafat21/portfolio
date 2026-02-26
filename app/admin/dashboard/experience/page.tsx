"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Briefcase, MapPin, Calendar, Building2, Code2, Clock, CheckCircle2 } from "lucide-react"
import { ExperienceDialog } from "@/app/admin/dashboard/experience/ExperienceDialog"
import type { Database } from "@/lib/supabase/database.types"

type Experience = Database["public"]["Tables"]["experience"]["Row"]

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)

  const fetchExperience = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("order_index", { ascending: true })

      if (error) throw error
      setExperience(data || [])
    } catch (error) {
      console.error("Error fetching experience:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchExperience()
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience entry?")) return

    try {
      const { error } = await supabase.from("experience").delete().eq("id", id)
      if (error) throw error
      await fetchExperience()
    } catch (error) {
      console.error("Error deleting experience:", error)
      alert("Failed to delete experience entry")
    }
  }, [fetchExperience])

  const handleEdit = useCallback((exp: Experience) => {
    setEditingExperience(exp)
    setDialogOpen(true)
  }, [])

  const handleAdd = useCallback(() => {
    setEditingExperience(null)
    setDialogOpen(true)
  }, [])

  const handleDialogClose = useCallback((refresh: boolean) => {
    setDialogOpen(false)
    setEditingExperience(null)
    if (refresh) {
      fetchExperience()
    }
  }, [fetchExperience])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-lightgray-100 tracking-tight">Career <span className="text-coral-400">Timeline</span></h1>
          <p className="text-lightgray-300/60 mt-1 font-medium">
            Manage your professional journey and industry impact.
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-coral-400 hover:bg-coral-500 text-navy-700 font-bold rounded-xl px-6 h-12 shadow-lg shadow-coral-400/10 transition-all gap-2 self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Experience</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-coral-400/20 border-t-coral-400 rounded-full animate-spin" />
          <p className="text-lightgray-300/50 font-mono text-sm tracking-widest uppercase">Loading architecture...</p>
        </div>
      ) : experience.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border-dashed border-navy-600/50">
          <div className="w-20 h-20 rounded-2xl bg-navy-800 flex items-center justify-center mx-auto mb-6 border border-coral-400/10 shadow-xl shadow-coral-400/5">
            <Briefcase className="w-10 h-10 text-coral-400/30" />
          </div>
          <h3 className="text-xl font-bold text-lightgray-100 mb-2">No professional history</h3>
          <p className="text-lightgray-300/40 mb-8 max-w-sm mx-auto">
            Your contributions matter. Start building your professional timeline to show your expertise.
          </p>
          <Button
            onClick={handleAdd}
            variant="outline"
            className="border-coral-400 text-coral-400 hover:bg-coral-400/10 rounded-xl px-8 h-12 transition-all font-bold"
          >
            Create First Milestone
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="glass-card group hover:border-coral-400/30 transition-all duration-300 rounded-3xl overflow-hidden flex flex-col h-full bg-navy-800/20">
                  <div className="p-6 border-b border-navy-600/50 flex items-start justify-between bg-navy-900/40">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-lightgray-100 group-hover:text-coral-400 transition-colors line-clamp-1">
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 blur-sm group-hover:blur-none transition-all">
                        <Building2 size={10} className="text-coral-400/50" />
                        <p className="text-[10px] uppercase font-mono tracking-widest text-lightgray-300/60 font-bold">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-navy-700 hover:bg-coral-400/20 hover:text-coral-400 transition-colors"
                        onClick={() => handleEdit(exp)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-navy-700 hover:bg-red-400/20 hover:text-red-400 transition-colors"
                        onClick={() => handleDelete(exp.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-navy-800 border border-navy-600/50 text-[9px] font-bold text-lightgray-300/40 uppercase tracking-widest">
                        {exp.employment_type}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-lightgray-300/30 font-mono">
                        <Calendar size={12} className="text-coral-400/20" />
                        <span>{formatDate(exp.start_date)} — {exp.current ? "Now" : exp.end_date ? formatDate(exp.end_date) : "?"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-lightgray-300/60 font-medium">
                      <MapPin size={14} className="text-coral-400/30" />
                      <span>{exp.location || "Remote"}</span>
                    </div>

                    {exp.description && (
                      <p className="text-xs text-lightgray-300/40 leading-relaxed line-clamp-3 relative pl-4 border-l border-coral-400/10 mb-4">
                        {exp.description}
                      </p>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        <Code2 size={12} className="text-coral-400/40 mt-1 mr-1" />
                        {exp.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-[9px] font-bold rounded-md bg-coral-400/5 text-coral-400/80 border border-coral-400/10 uppercase tracking-tighter"
                          >
                            {tech}
                          </span>
                        ))}
                        {exp.technologies.length > 4 && (
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded-md bg-navy-800 text-lightgray-300/20 border border-navy-600/50 uppercase tracking-tighter">
                            +{exp.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-4 pt-4 flex items-center justify-between border-t border-navy-600/30">
                      <div className="text-[10px] font-mono text-lightgray-300/10 uppercase tracking-widest leading-none">
                        Rnk: {exp.order_index}
                      </div>

                      {exp.current && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-tighter animate-pulse shadow-lg shadow-emerald-500/10">
                          <CheckCircle2 size={10} />
                          <span>Active</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ExperienceDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        experience={editingExperience}
      />
    </div>
  )
}

