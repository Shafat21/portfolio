"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Building2, Briefcase, MapPin, Calendar, FileText, Code2, Plus, X, ListOrdered, Clock } from "lucide-react"
import type { Database } from "@/lib/supabase/database.types"

type Experience = Database["public"]["Tables"]["experience"]["Row"]

interface ExperienceDialogProps {
  open: boolean
  onOpenChange: (refresh: boolean) => void
  experience: Experience | null
}

export function ExperienceDialog({ open, onOpenChange, experience }: ExperienceDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    start_date: "",
    end_date: "",
    current: false,
    description: "",
    location: "",
    employment_type: "Full-time",
    technologies: [] as string[],
    order_index: 0,
  })
  const [techInput, setTechInput] = useState("")

  useEffect(() => {
    if (!open) return

    if (experience) {
      setFormData({
        company: experience.company,
        position: experience.position,
        start_date: experience.start_date,
        end_date: experience.end_date || "",
        current: experience.current,
        description: experience.description || "",
        location: experience.location || "",
        employment_type: experience.employment_type,
        technologies: experience.technologies || [],
        order_index: experience.order_index,
      })
    } else {
      setFormData({
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        current: false,
        description: "",
        location: "",
        employment_type: "Full-time",
        technologies: [],
        order_index: 0,
      })
    }
    setTechInput("")
  }, [experience, open])

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      })
      setTechInput("")
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSave = {
        ...formData,
        end_date: formData.end_date || null,
        description: formData.description || null,
        location: formData.location || null,
      }

      if (experience) {
        const { error } = await (supabase.from("experience") as any)
          .update(dataToSave)
          .eq("id", experience.id)

        if (error) throw error
      } else {
        const { error } = await (supabase.from("experience") as any).insert([dataToSave])

        if (error) throw error
      }

      onOpenChange(true)
    } catch (error) {
      console.error("Error saving experience:", error)
      alert("Failed to save experience entry")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onOpenChange(false)}>
      <DialogContent className="max-w-2xl bg-navy-700/90 backdrop-blur-xl border-coral-400/10 text-lightgray-100 rounded-3xl p-0 shadow-2xl overflow-hidden">
        <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-coral-400 to-transparent opacity-50" />

          <DialogHeader className="p-8 pb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-coral-400/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-coral-400" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  {experience ? "Update" : "Register"} <span className="text-coral-400">Professional Venture</span>
                </DialogTitle>
                <DialogDescription className="text-lightgray-300/40 font-medium">
                  {experience ? "Modify your career milestones" : "Add a new chapter to your professional journey"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="company" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                  <Building2 size={12} className="text-coral-400/50" />
                  Company @ Organization *
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                  placeholder="Where did you make an impact?"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="position" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                  <Briefcase size={12} className="text-coral-400/50" />
                  Professional Role *
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                  placeholder="e.g., Senior Full-Stack Engineer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment_type" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                  <Clock size={12} className="text-coral-400/50" />
                  Engagement Type *
                </Label>
                <Select
                  value={formData.employment_type}
                  onValueChange={(value) => setFormData({ ...formData, employment_type: value })}
                >
                  <SelectTrigger className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 rounded-xl h-12 text-lightgray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-700 border-navy-600 text-lightgray-100">
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                  <MapPin size={12} className="text-coral-400/50" />
                  Working Site
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco (Remote)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="start_date" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                  <Calendar size={12} className="text-coral-400/50" />
                  Start Epoch *
                </Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4 [color-scheme:dark]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                  <Calendar size={12} className="text-coral-400/50" />
                  End Epoch
                </Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  disabled={formData.current}
                  className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4 disabled:opacity-30 [color-scheme:dark]"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                  <FileText size={12} className="text-coral-400/50" />
                  Venture Summary
                </Label>
                <Textarea
                  id="description"
                  placeholder="What were your core responsibilities and proudest achievements?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl text-lightgray-100 placeholder:text-lightgray-300/20 p-4 min-h-[120px]"
                  rows={4}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="technologies" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                  <Code2 size={12} className="text-coral-400/50" />
                  Tech Stack Implemented
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="technologies"
                    placeholder="Engineered with..."
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTechnology()
                      }
                    }}
                    className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 flex-1 px-4"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTechnology}
                    className="bg-navy-800 border border-navy-600 text-coral-400 hover:bg-coral-400 hover:text-navy-700 rounded-xl px-4 font-bold transition-all"
                  >
                    <Plus size={18} />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.technologies.map((tech, index) => (
                    <div
                      key={tech}
                      className="px-3 py-1 text-xs font-bold rounded-lg bg-coral-400/10 text-coral-400 border border-coral-400/20 flex items-center gap-2 group transition-all hover:bg-coral-400/20"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(tech)}
                        className="text-coral-400/40 hover:text-coral-400 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order_index" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                  <ListOrdered size={12} className="text-coral-400/50" />
                  Priority Rank
                </Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) =>
                    setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })
                  }
                  className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 flex-1 px-4"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="current"
                  className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all cursor-pointer ${formData.current ? "bg-coral-400/10 border-coral-400/30 shadow-lg shadow-coral-400/5" : "bg-navy-800/30 border-navy-600"
                    }`}
                >
                  <Checkbox
                    id="current"
                    checked={formData.current}
                    className="border-coral-400/40 data-[state=checked]:bg-coral-400 data-[state=checked]:text-navy-700 h-5 w-5 rounded-lg"
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, current: checked as boolean })
                    }
                  />
                  <span className="text-sm font-bold text-lightgray-100">
                    Active Tenure (Currently engaged)
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-navy-600/50">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="text-lightgray-300 hover:text-coral-400 hover:bg-navy-600/50 rounded-xl px-6"
              >
                Discard
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-coral-400 hover:bg-coral-500 text-navy-700 font-bold rounded-xl px-8 shadow-lg shadow-coral-400/10"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-navy-700/30 border-t-navy-700 rounded-full animate-spin" />
                    <span>Syncing...</span>
                  </div>
                ) : (
                  experience ? "Update Milestone" : "Register Venture"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

