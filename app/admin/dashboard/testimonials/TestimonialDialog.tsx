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
import { Sparkles, User, Briefcase, Building2, Quote, Star, ImageIcon, ListOrdered } from "lucide-react"
import type { Database } from "@/lib/supabase/database.types"

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"]

interface TestimonialDialogProps {
  open: boolean
  onOpenChange: (refresh: boolean) => void
  testimonial: Testimonial | null
}

export function TestimonialDialog({ open, onOpenChange, testimonial }: TestimonialDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    avatar_url: "",
    rating: 5,
    order_index: 0,
    published: true,
  })

  useEffect(() => {
    if (!open) return

    if (testimonial) {
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        content: testimonial.content,
        avatar_url: testimonial.avatar_url || "",
        rating: testimonial.rating,
        order_index: testimonial.order_index,
        published: testimonial.published,
      })
    } else {
      setFormData({
        name: "",
        role: "",
        company: "",
        content: "",
        avatar_url: "",
        rating: 5,
        order_index: 0,
        published: true,
      })
    }
  }, [testimonial, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (testimonial) {
        const { error } = await (supabase.from("testimonials") as any)
          .update(formData)
          .eq("id", testimonial.id)

        if (error) throw error
      } else {
        const { error } = await (supabase.from("testimonials") as any).insert([formData])

        if (error) throw error
      }

      onOpenChange(true)
    } catch (error) {
      console.error("Error saving testimonial:", error)
      alert("Failed to save testimonial")
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
                {testimonial ? "Edit" : "Register"} <span className="text-coral-400">Testimonial</span>
              </DialogTitle>
              <DialogDescription className="text-lightgray-300/40 font-medium">
                {testimonial ? "Modify the voice of your client" : "Add a new success story to your wall of fame"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <User size={12} className="text-coral-400/50" />
                Client Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Briefcase size={12} className="text-coral-400/50" />
                Professional Role *
              </Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                placeholder="CEO, Lead Developer, etc."
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="company" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Building2 size={12} className="text-coral-400/50" />
                Company / Organization *
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 placeholder:text-lightgray-300/20 px-4"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="content" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Quote size={12} className="text-coral-400/50" />
                Testimonial Content *
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl text-lightgray-100 placeholder:text-lightgray-300/20 p-4 min-h-[120px]"
                placeholder="What did they say about your work?"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="avatar_url" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <ImageIcon size={12} className="text-coral-400/50" />
                Avatar Mirror URL
              </Label>
              <Input
                id="avatar_url"
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 focus:ring-coral-400/20 rounded-xl h-12 text-lightgray-100 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating" className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 ml-1 flex items-center gap-2">
                <Star size={12} className="text-coral-400/50" />
                Experience Rating *
              </Label>
              <Select
                value={formData.rating.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, rating: parseInt(value) })
                }
              >
                <SelectTrigger className="bg-navy-800/50 border-navy-600 focus:border-coral-400/50 rounded-xl h-12 text-lightgray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy-700 border-navy-600 text-lightgray-100">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      <div className="flex items-center gap-1">
                        {rating} Star{rating !== 1 ? "s" : ""}
                        <Star size={10} className="fill-coral-400 text-coral-400 ml-1" />
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

            <div className="md:col-span-2">
              <label
                htmlFor="published"
                className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all cursor-pointer ${formData.published ? "bg-coral-400/10 border-coral-400/30 shadow-lg shadow-coral-400/5" : "bg-navy-800/30 border-navy-600"
                  }`}
              >
                <Checkbox
                  id="published"
                  checked={formData.published}
                  className="border-coral-400/40 data-[state=checked]:bg-coral-400 data-[state=checked]:text-navy-700 h-5 w-5 rounded-lg"
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: checked as boolean })
                  }
                />
                <span className="text-sm font-bold text-lightgray-100">
                  Published (Live on site)
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
                testimonial ? "Update Voice" : "Register Testimony"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

