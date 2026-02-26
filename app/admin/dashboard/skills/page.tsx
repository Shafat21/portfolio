"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Zap, LayoutGrid, Code2 } from "lucide-react"
import { SkillDialog } from "@/app/admin/dashboard/skills/SkillDialog"
import type { Database } from "@/lib/supabase/database.types"

type Skill = Database["public"]["Tables"]["skills"]["Row"]

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

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

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return

    try {
      const { error } = await supabase.from("skills").delete().eq("id", id)
      if (error) throw error
      await fetchSkills()
    } catch (error) {
      console.error("Error deleting skill:", error)
      alert("Failed to delete skill")
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingSkill(null)
    setDialogOpen(true)
  }

  const handleDialogClose = (refresh: boolean) => {
    setDialogOpen(false)
    setEditingSkill(null)
    if (refresh) {
      fetchSkills()
    }
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemAnim = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-lightgray-100 tracking-tight">Technical <span className="text-coral-400">Skills</span></h1>
          <p className="text-lightgray-300/60 mt-1 font-medium">
            Manage your toolkit and core competencies.
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-coral-400 hover:bg-coral-500 text-navy-700 font-bold rounded-xl px-6 h-12 shadow-lg shadow-coral-400/10 transition-all gap-2 self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Skill</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-coral-400/20 border-t-coral-400 rounded-full animate-spin" />
          <p className="text-lightgray-300/50 font-mono text-sm tracking-widest uppercase">Syncing toolkit...</p>
        </div>
      ) : skills.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border-dashed border-navy-600/50">
          <div className="w-20 h-20 rounded-2xl bg-navy-800 flex items-center justify-center mx-auto mb-6 border border-coral-400/10 shadow-xl shadow-coral-400/5">
            <Zap className="w-10 h-10 text-coral-400/30" />
          </div>
          <h3 className="text-xl font-bold text-lightgray-100 mb-2">No skills indexed</h3>
          <p className="text-lightgray-300/40 mb-8 max-w-sm mx-auto">
            You haven&apos;t added any technical skills to your portfolio yet.
          </p>
          <Button
            onClick={handleAdd}
            variant="outline"
            className="border-coral-400 text-coral-400 hover:bg-coral-400/10 rounded-xl px-8 h-12 transition-all font-bold"
          >
            Add First Skill
          </Button>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-navy-800 border border-coral-400/10 flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4 text-coral-400" />
                </div>
                <h2 className="text-xl font-bold text-lightgray-100 uppercase tracking-widest text-sm">{category}</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-navy-600/50 to-transparent" />
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {categorySkills.map((skill) => (
                  <motion.div key={skill.id} variants={itemAnim}>
                    <div className="glass-card group hover:border-coral-400/30 transition-all duration-300 rounded-2xl p-5 relative overflow-hidden h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border border-coral-400/5">
                            <Code2 className="w-5 h-5 text-coral-400" />
                          </div>
                          <h3 className="font-bold text-lightgray-100 group-hover:text-coral-400 transition-colors line-clamp-1">
                            {skill.name}
                          </h3>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg bg-navy-700 hover:bg-coral-400/20 hover:text-coral-400"
                            onClick={() => handleEdit(skill)}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg bg-navy-700 hover:bg-red-400/20 hover:text-red-400"
                            onClick={() => handleDelete(skill.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest mb-2">
                            <span className="text-lightgray-300/40">Proficiency</span>
                            <span className="text-coral-400 font-bold">{skill.proficiency}%</span>
                          </div>
                          <div className="w-full bg-navy-800 rounded-full h-1.5 overflow-hidden border border-navy-600/30">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="bg-gradient-to-r from-coral-400 to-coral-500 h-full shadow-[0_0_10px_rgba(247,155,114,0.3)]"
                            />
                          </div>
                        </div>

                        {skill.icon_name && (
                          <div className="flex items-center gap-2 mt-4 opacity-30 group-hover:opacity-60 transition-opacity">
                            <div className="w-1 h-1 rounded-full bg-lightgray-300" />
                            <span className="text-[10px] uppercase font-mono tracking-tighter text-lightgray-300">Identifier: {skill.icon_name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      <SkillDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        skill={editingSkill}
      />
    </div>
  )
}

