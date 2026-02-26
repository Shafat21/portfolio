"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, GraduationCap, MapPin, Calendar, BookOpen, Award } from "lucide-react"
import { EducationDialog } from "@/app/admin/dashboard/education/EducationDialog"
import type { Database } from "@/lib/supabase/database.types"

type Education = Database["public"]["Tables"]["education"]["Row"]

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)

  const fetchEducation = async () => {
    setLoading(true)
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

  useEffect(() => {
    fetchEducation()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return

    try {
      const { error } = await supabase.from("education").delete().eq("id", id)
      if (error) throw error
      await fetchEducation()
    } catch (error) {
      console.error("Error deleting education:", error)
      alert("Failed to delete education entry")
    }
  }

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu)
    setDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingEducation(null)
    setDialogOpen(true)
  }

  const handleDialogClose = (refresh: boolean) => {
    setDialogOpen(false)
    setEditingEducation(null)
    if (refresh) {
      fetchEducation()
    }
  }

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
          <h1 className="text-3xl font-bold text-lightgray-100 tracking-tight">Academic <span className="text-coral-400">Path</span></h1>
          <p className="text-lightgray-300/60 mt-1 font-medium">
            Manage your educational background and qualifications.
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-coral-400 hover:bg-coral-500 text-navy-700 font-bold rounded-xl px-6 h-12 shadow-lg shadow-coral-400/10 transition-all gap-2 self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Education</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-coral-400/20 border-t-coral-400 rounded-full animate-spin" />
          <p className="text-lightgray-300/50 font-mono text-sm tracking-widest uppercase">Loading scholars...</p>
        </div>
      ) : education.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border-dashed border-navy-600/50">
          <div className="w-20 h-20 rounded-2xl bg-navy-800 flex items-center justify-center mx-auto mb-6 border border-coral-400/10 shadow-xl shadow-coral-400/5">
            <GraduationCap className="w-10 h-10 text-coral-400/30" />
          </div>
          <h3 className="text-xl font-bold text-lightgray-100 mb-2">No education history</h3>
          <p className="text-lightgray-300/40 mb-8 max-w-sm mx-auto">
            Your academic journey is part of your story. Add your degrees and certifications here.
          </p>
          <Button
            onClick={handleAdd}
            variant="outline"
            className="border-coral-400 text-coral-400 hover:bg-coral-400/10 rounded-xl px-8 h-12 transition-all font-bold"
          >
            Record Your First Degree
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="glass-card group hover:border-coral-400/30 transition-all duration-300 rounded-3xl overflow-hidden flex flex-col h-full bg-navy-800/20">
                  <div className="p-6 border-b border-navy-600/50 flex items-start justify-between bg-navy-900/40">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-lightgray-100 group-hover:text-coral-400 transition-colors line-clamp-1">
                        {edu.institution}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin size={10} className="text-coral-400/50" />
                        <p className="text-[10px] uppercase font-mono tracking-widest text-lightgray-300/40">
                          {edu.location || "Remote / Global"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-navy-700 hover:bg-coral-400/20 hover:text-coral-400 transition-colors"
                        onClick={() => handleEdit(edu)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-navy-700 hover:bg-red-400/20 hover:text-red-400 transition-colors"
                        onClick={() => handleDelete(edu.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm text-lightgray-100 font-bold">
                        <BookOpen size={16} className="text-coral-400 mt-0.5 shrink-0" />
                        <span>{edu.degree}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-lightgray-300/60 font-medium pl-6">
                        <Award size={12} className="text-coral-400/30" />
                        <span>{edu.field_of_study}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-800/50 border border-navy-600/50 w-fit">
                      <Calendar size={12} className="text-coral-400/50" />
                      <span className="text-[10px] font-bold text-lightgray-300/80 uppercase tracking-tighter">
                        {formatDate(edu.start_date)} — {edu.current ? "Present" : edu.end_date ? formatDate(edu.end_date) : "TBD"}
                      </span>
                    </div>

                    {edu.description && (
                      <p className="text-xs text-lightgray-300/40 leading-relaxed line-clamp-3 italic italic-quotes">
                        &quot;{edu.description}&quot;
                      </p>
                    )}

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-navy-600/30">
                      {edu.gpa ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-lightgray-300/20">GPA:</span>
                          <span className="text-[11px] font-bold text-coral-400">{edu.gpa}</span>
                        </div>
                      ) : (
                        <div />
                      )}

                      {edu.current && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-widest shadow-sm shadow-emerald-500/5">
                          In Progress
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

      <EducationDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        education={editingEducation}
      />
    </div>
  )
}

