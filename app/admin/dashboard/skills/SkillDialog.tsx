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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sparkles, Hammer, Percent, Tag, ListOrdered } from "lucide-react"
import type { Database } from "@/lib/supabase/database.types"

type Skill = Database["public"]["Tables"]["skills"]["Row"]

interface SkillDialogProps {
  open: boolean
  onOpenChange: (refresh: boolean) => void
  skill: Skill | null
}

export function SkillDialog({ open, onOpenChange, skill }: SkillDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    proficiency: 80,
    icon_name: "",
    order_index: 0,
  })

  useEffect(() => {
    if (!open) return

    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        icon_name: skill.icon_name || "",
        order_index: skill.order_index,
      })
    } else {
      setFormData({
        name: "",
        category: "Frontend",
        proficiency: 80,
        icon_name: "",
        order_index: 0,
      })
    }
  }, [skill, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSave = {
        ...formData,
        icon_name: formData.icon_name || null,
      }

      if (skill) {
        const { error } = await (supabase.from("skills") as any)
          .update(dataToSave)
          .eq("id", skill.id)

        if (error) throw error
      } else {
        const { error } = await (supabase.from("skills") as any).insert([dataToSave])

        if (error) throw error
      }

      onOpenChange(true)
    } catch (error) {
      console.error("Error saving skill:", error)
      alert("Failed to save skill")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onOpenChange(false)}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-navy-700/90 backdrop-blur-xl border-coral-400/10 text-lightgray-100 rounded-3xl p-0 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-coral-400 to-transparent opacity-50" />

        <DialogHeader className="p-8 pb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-coral-400/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-coral-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                {skill ? "Edit" : "Index"} <span className="text-coral-400">Skill</span>
              </DialogTitle>
              <DialogDescription className="text-lightgray-300/40 font-medium">
                {skill ? "Update your technical competence details" : "Register a new tool or technology to your toolkit"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Hammer size={12} className="text-coral-400/50" />
                Technology Name *
              </Label>
              <Input
                id="name"
                placeholder="e.g., React, Python, AWS"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Tag size={12} className="text-coral-400/50" />
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 rounded-xl h-12 text-lightgray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy-700 border-navy-600 text-lightgray-100">
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Tools">Tools</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proficiency" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Percent size={12} className="text-coral-400/50" />
                Proficiency (0-100) *
              </Label>
              <Input
                id="proficiency"
                type="number"
                min="0"
                max="100"
                value={formData.proficiency}
                onChange={(e) =>
                  setFormData({ ...formData, proficiency: parseInt(e.target.value) || 0 })
                }
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon_name" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1">Icon Reference</Label>
              <Input
                id="icon_name"
                placeholder="e.g., Code, Database"
                value={formData.icon_name}
                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_index" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <ListOrdered size={12} className="text-coral-400/50" />
                Display Order
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
                skill ? "Update Skill" : "Index Technology"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

