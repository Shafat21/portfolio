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
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, GraduationCap, School, Book, Calendar, MapPin, Award, ListOrdered, FileText } from "lucide-react"
import type { Database } from "@/lib/supabase/database.types"

type Education = Database["public"]["Tables"]["education"]["Row"]

interface EducationDialogProps {
  open: boolean
  onOpenChange: (refresh: boolean) => void
  education: Education | null
}

export function EducationDialog({ open, onOpenChange, education }: EducationDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    current: false,
    description: "",
    location: "",
    gpa: "",
    order_index: 0,
  })

  useEffect(() => {
    if (!open) return

    if (education) {
      setFormData({
        institution: education.institution,
        degree: education.degree,
        field_of_study: education.field_of_study,
        start_date: education.start_date,
        end_date: education.end_date || "",
        current: education.current,
        description: education.description || "",
        location: education.location || "",
        gpa: education.gpa || "",
        order_index: education.order_index,
      })
    } else {
      setFormData({
        institution: "",
        degree: "",
        field_of_study: "",
        start_date: "",
        end_date: "",
        current: false,
        description: "",
        location: "",
        gpa: "",
        order_index: 0,
      })
    }
  }, [education, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSave = {
        ...formData,
        end_date: formData.end_date || null,
        description: formData.description || null,
        location: formData.location || null,
        gpa: formData.gpa || null,
      }

      if (education) {
        const { error } = await (supabase.from("education") as any)
          .update(dataToSave)
          .eq("id", education.id)

        if (error) throw error
      } else {
        const { error } = await (supabase.from("education") as any).insert([dataToSave])

        if (error) throw error
      }

      onOpenChange(true)
    } catch (error) {
      console.error("Error saving education:", error)
      alert("Failed to save education entry")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onOpenChange(false)}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-navy-700/90 backdrop-blur-xl border-coral-400/10 text-lightgray-100 rounded-3xl p-0 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-coral-400 to-transparent opacity-50" />

        <DialogHeader className="p-8 pb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-coral-400/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-coral-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                {education ? "Modify" : "Enter"} <span className="text-coral-400">Academic Data</span>
              </DialogTitle>
              <DialogDescription className="text-lightgray-300/40 font-medium">
                {education ? "Update your scholarly achievements" : "Add a new milestone to your educational path"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="institution" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <School size={12} className="text-coral-400/50" />
                School / University *
              </Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                placeholder="e.g., Massachusetts Institute of Technology"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="degree" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <GraduationCap size={12} className="text-coral-400/50" />
                Degree Earned *
              </Label>
              <Input
                id="degree"
                placeholder="e.g., Bachelor of Science"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field_of_study" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Book size={12} className="text-coral-400/50" />
                Major / Field *
              </Label>
              <Input
                id="field_of_study"
                placeholder="e.g., Computer Science"
                value={formData.field_of_study}
                onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_date" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Calendar size={12} className="text-coral-400/50" />
                Start Date *
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
                End Date
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
              <Label htmlFor="location" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <MapPin size={12} className="text-coral-400/50" />
                Physical Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., Cambridge, MA (or Remote)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpa" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Award size={12} className="text-coral-400/50" />
                Academic GPA
              </Label>
              <Input
                id="gpa"
                placeholder="e.g., 3.8/4.0"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_index" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <ListOrdered size={12} className="text-coral-400/50" />
                Index Priority
              </Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) =>
                  setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })
                }
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <FileText size={12} className="text-coral-400/50" />
                Scholarly Highlights
              </Label>
              <Textarea
                id="description"
                placeholder="Notable achievements, specialized coursework, honor societies..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl text-lightgray-100 placeholder:text-lightgray-300/20 p-4 min-h-[100px]"
                rows={3}
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
                  Active Scholar (Currently studying here)
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
              Cancel
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
                education ? "Apply Changes" : "Formalize Entry"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

