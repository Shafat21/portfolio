"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, ExternalLink, FolderKanban, Star, Pin } from "lucide-react"
import { ProjectDialog } from "@/app/admin/dashboard/projects/ProjectDialog"
import type { Database } from "@/lib/supabase/database.types"

type Project = Database["public"]["Tables"]["projects"]["Row"]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id)
      if (error) throw error
      await fetchProjects()
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Failed to delete project")
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingProject(null)
    setDialogOpen(true)
  }

  const handleDialogClose = (refresh: boolean) => {
    setDialogOpen(false)
    setEditingProject(null)
    if (refresh) {
      fetchProjects()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-lightgray-100 tracking-tight">Portfolio <span className="text-coral-400">Projects</span></h1>
          <p className="text-lightgray-300/60 mt-1 font-medium">
            Showcase your best work and manage project details.
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-coral-400 hover:bg-coral-500 text-navy-700 font-bold rounded-xl px-6 h-12 shadow-lg shadow-coral-400/10 transition-all gap-2 self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-coral-400/20 border-t-coral-400 rounded-full animate-spin" />
          <p className="text-lightgray-300/50 font-mono text-sm tracking-widest uppercase">Retrieving projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border-dashed border-navy-600/50">
          <div className="w-20 h-20 rounded-2xl bg-navy-800 flex items-center justify-center mx-auto mb-6 border border-coral-400/10 shadow-xl shadow-coral-400/5">
            <FolderKanban className="w-10 h-10 text-coral-400/30" />
          </div>
          <h3 className="text-xl font-bold text-lightgray-100 mb-2">No projects found</h3>
          <p className="text-lightgray-300/40 mb-8 max-w-sm mx-auto">
            Your portfolio is looking a bit empty. Start by adding your first masterpiece.
          </p>
          <Button
            onClick={handleAdd}
            variant="outline"
            className="border-coral-400 text-coral-400 hover:bg-coral-400/10 rounded-xl px-8 h-12 transition-all font-bold"
          >
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="glass-card group hover:border-coral-400/30 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-coral-400/5">
                  {/* Project Tag/Header Area */}
                  <div className="p-5 border-b border-navy-600/50 flex items-start justify-between bg-navy-800/20">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded bg-coral-400/10 text-coral-400 border border-coral-400/20">
                          {project.category}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded bg-navy-600 text-lightgray-300/70 border border-navy-500/30">
                          {project.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-lightgray-100 group-hover:text-coral-400 transition-colors line-clamp-1 mt-1">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-lg bg-navy-700 hover:bg-coral-400/20 hover:text-coral-400 border border-navy-600 transition-all"
                        onClick={() => handleEdit(project)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-lg bg-navy-700 hover:bg-red-400/20 hover:text-red-400 border border-navy-600 transition-all"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col space-y-4">
                    <p className="text-sm text-lightgray-300/60 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-2">
                      <p className="text-[11px] font-mono text-lightgray-300/30 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Code2 size={12} className="text-coral-400/50" />
                        Tech Stack
                      </p>
                      <p className="text-xs font-medium text-lightgray-300 line-clamp-2 bg-navy-800/50 p-3 rounded-xl border border-navy-600/50">
                        {project.tech_stack}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2 mt-auto">
                      {project.featured && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
                          <Star size={10} fill="currentColor" />
                          <span>Featured</span>
                        </div>
                      )}
                      {project.pinned && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-coral-400 bg-coral-400/10 px-2 py-1 rounded-full border border-coral-400/20">
                          <Pin size={10} fill="currentColor" />
                          <span>Pinned</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {project.link && (
                    <div className="px-6 py-4 border-t border-navy-600/50 bg-navy-800/10">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-xs font-bold text-coral-400 hover:text-coral-300 transition-colors uppercase tracking-widest"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Preview Project
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        project={editingProject}
      />
    </div>
  )
}

function Code2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  )
}

