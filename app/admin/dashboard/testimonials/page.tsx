"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Star, Quote, UserCircle2, CheckCircle2, Clock } from "lucide-react"
import { TestimonialDialog } from "@/app/admin/dashboard/testimonials/TestimonialDialog"
import type { Database } from "@/lib/supabase/database.types"

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  const fetchTestimonials = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("order_index", { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id)
      if (error) throw error
      await fetchTestimonials()
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      alert("Failed to delete testimonial")
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingTestimonial(null)
    setDialogOpen(true)
  }

  const handleDialogClose = (refresh: boolean) => {
    setDialogOpen(false)
    setEditingTestimonial(null)
    if (refresh) {
      fetchTestimonials()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-lightgray-100 tracking-tight">Client <span className="text-coral-400">Testimonials</span></h1>
          <p className="text-lightgray-300/60 mt-1 font-medium">
            Manage feedback and showcase social proof.
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-coral-400 hover:bg-coral-500 text-navy-700 font-bold rounded-xl px-6 h-12 shadow-lg shadow-coral-400/10 transition-all gap-2 self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Testimonial</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-coral-400/20 border-t-coral-400 rounded-full animate-spin" />
          <p className="text-lightgray-300/50 font-mono text-sm tracking-widest uppercase">Fetching reviews...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border-dashed border-navy-600/50">
          <div className="w-20 h-20 rounded-2xl bg-navy-800 flex items-center justify-center mx-auto mb-6 border border-coral-400/10 shadow-xl shadow-coral-400/5">
            <Quote className="w-10 h-10 text-coral-400/30" />
          </div>
          <h3 className="text-xl font-bold text-lightgray-100 mb-2">No testimonials yet</h3>
          <p className="text-lightgray-300/40 mb-8 max-w-sm mx-auto">
            Social proof builds trust. Start by adding your first client testimonial.
          </p>
          <Button
            onClick={handleAdd}
            variant="outline"
            className="border-coral-400 text-coral-400 hover:bg-coral-400/10 rounded-xl px-8 h-12 transition-all font-bold"
          >
            Create First Testimonial
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="glass-card group hover:border-coral-400/30 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col h-full bg-navy-800/20">
                  <div className="p-6 border-b border-navy-600/50 flex items-start justify-between bg-navy-900/40">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-navy-700 flex items-center justify-center border border-coral-400/10 overflow-hidden shadow-inner">
                        {testimonial.avatar_url ? (
                          <img
                            src={testimonial.avatar_url}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserCircle2 className="w-8 h-8 text-lightgray-300/20" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lightgray-100 group-hover:text-coral-400 transition-colors line-clamp-1">
                          {testimonial.name}
                        </h3>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-lightgray-300/40">
                          {testimonial.role} @ {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-navy-700 hover:bg-coral-400/20 hover:text-coral-400"
                        onClick={() => handleEdit(testimonial)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-navy-700 hover:bg-red-400/20 hover:text-red-400"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < testimonial.rating ? "fill-coral-400 text-coral-400" : "text-navy-600"}`}
                        />
                      ))}
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-8 h-8 text-coral-400/5 -z-10" />
                      <p className="text-sm text-lightgray-300/60 leading-relaxed italic line-clamp-4 relative z-10">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {testimonial.published ? (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">
                            <CheckCircle2 size={10} />
                            <span>Live</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-600/50 border border-navy-500/30 text-[10px] font-bold text-lightgray-300/40 uppercase tracking-tighter">
                            <Clock size={10} />
                            <span>Draft</span>
                          </div>
                        )}
                      </div>

                      <div className="text-[10px] font-mono text-lightgray-300/20 uppercase tracking-widest">
                        Ref: {testimonial.order_index}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <TestimonialDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        testimonial={editingTestimonial}
      />
    </div>
  )
}

