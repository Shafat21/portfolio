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
import { X, Sparkles, Layout, Globe, Github as GithubIcon, ListOrdered, Image as ImageIcon } from "lucide-react"
import type { Database } from "@/lib/supabase/database.types"

type Project = Database["public"]["Tables"]["projects"]["Row"]

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (refresh: boolean) => void
  project: Project | null
}

export function ProjectDialog({ open, onOpenChange, project }: ProjectDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    link: "",
    github_link: "",
    icon_name: "Code",
    type: "live" as "live" | "github",
    category: "Web",
    featured: false,
    pinned: false,
    order_index: 0,
    image_url: "",
  })

  useEffect(() => {
    if (!open) return

    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        tech_stack: project.tech_stack,
        link: project.link || "",
        github_link: project.github_link || "",
        icon_name: project.icon_name,
        type: project.type as "live" | "github",
        category: project.category,
        featured: project.featured,
        pinned: project.pinned,
        order_index: project.order_index,
        image_url: project.image_url || "",
      })
    } else {
      setFormData({
        title: "",
        description: "",
        tech_stack: "",
        link: "",
        github_link: "",
        icon_name: "Code",
        type: "live",
        category: "Web",
        featured: false,
        pinned: false,
        order_index: 0,
        image_url: "",
      })
    }
  }, [project, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (project) {
        // Update existing project
        const { error } = await (supabase.from("projects") as any)
          .update(formData)
          .eq("id", project.id)

        if (error) throw error
      } else {
        // Insert new project
        const { error } = await (supabase.from("projects") as any).insert([formData])

        if (error) throw error
      }

      onOpenChange(true) // Close and refresh
    } catch (error) {
      console.error("Error saving project:", error)
      alert("Failed to save project")
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
                {project ? "Edit" : "Create"} <span className="text-coral-400">Project</span>
              </DialogTitle>
              <DialogDescription className="text-lightgray-300/40 font-medium">
                {project ? "Refine your project details" : "Add a new masterpiece to your portfolio"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                placeholder="Project Name"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl text-lightgray-100 placeholder:text-lightgray-300/20 p-4 min-h-[120px]"
                placeholder="Tell the story of this project..."
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="tech_stack" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1">Tech Stack *</Label>
              <div className="relative">
                <Input
                  id="tech_stack"
                  placeholder="e.g., Next.js, Tailwind, MongoDB"
                  value={formData.tech_stack}
                  onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                  className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "live" | "github") =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 rounded-xl h-12 text-lightgray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy-700 border-navy-600 text-lightgray-100">
                  <SelectItem value="live">Live Project</SelectItem>
                  <SelectItem value="github">Open Source</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 rounded-xl h-12 text-lightgray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy-700 border-navy-600 text-lightgray-100">
                  <SelectItem value="Web">Web Development</SelectItem>
                  <SelectItem value="FiveM">FiveM</SelectItem>
                  <SelectItem value="Python">Python Tools</SelectItem>
                  <SelectItem value="IoT">IoT / Hardware</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Globe size={12} className="text-coral-400/50" />
                Project URL
              </Label>
              <Input
                id="link"
                type="url"
                placeholder="https://example.com"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_link" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <GithubIcon size={12} className="text-coral-400/50" />
                GitHub URL
              </Label>
              <Input
                id="github_link"
                type="url"
                placeholder="https://github.com/..."
                value={formData.github_link}
                onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon_name" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Layout size={12} className="text-coral-400/50" />
                Lucide Icon
              </Label>
              <Input
                id="icon_name"
                placeholder="e.g., Code, Server"
                value={formData.icon_name}
                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_index" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <ListOrdered size={12} className="text-coral-400/50" />
                Order Index
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
              <Label htmlFor="image_url" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <ImageIcon size={12} className="text-coral-400/50" />
                Thumbnail Mirror URL
              </Label>
              <Input
                id="image_url"
                type="url"
                placeholder="https://..."
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4"
              />
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-4 mt-4">
              <label
                htmlFor="featured"
                className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all cursor-pointer ${formData.featured ? "bg-coral-400/10 border-coral-400/30 shadow-lg shadow-coral-400/5" : "bg-navy-800/30 border-navy-600"
                  }`}
              >
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  className="border-coral-400/40 data-[state=checked]:bg-coral-400 data-[state=checked]:text-navy-700 h-5 w-5 rounded-lg"
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, featured: checked as boolean })
                  }
                />
                <span className="text-sm font-bold text-lightgray-100">
                  Featured
                </span>
              </label>

              <label
                htmlFor="pinned"
                className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all cursor-pointer ${formData.pinned ? "bg-coral-400/10 border-coral-400/30 shadow-lg shadow-coral-400/5" : "bg-navy-800/30 border-navy-600"
                  }`}
              >
                <Checkbox
                  id="pinned"
                  checked={formData.pinned}
                  className="border-coral-400/40 data-[state=checked]:bg-coral-400 data-[state=checked]:text-navy-700 h-5 w-5 rounded-lg"
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, pinned: checked as boolean })
                  }
                />
                <span className="text-sm font-bold text-lightgray-100">
                  Pinned
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
              Discard Changes
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
                project ? "Update Project" : "Create Project"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

