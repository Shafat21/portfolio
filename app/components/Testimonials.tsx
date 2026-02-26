import React, { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Star } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { supabase } from "@/lib/supabase/client"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar_url: string | null
  order_index: number
  published: boolean
}

const memojiAvatars = [
  "https://i.pravatar.cc/150?img=11",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=13",
  "https://i.pravatar.cc/150?img=14",
  "https://i.pravatar.cc/150?img=15",
  "https://i.pravatar.cc/150?img=16",
]

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const getAvatar = (name: string) => {
    const idx = name.charCodeAt(0) % memojiAvatars.length
    return memojiAvatars[idx]
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      className="group relative w-full mb-6"
    >
      <div className="relative p-6 rounded-[2rem] bg-navy-800/40 backdrop-blur-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-coral-400/30">
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(247,155,114,0.08), transparent 80%)`
            ),
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-coral-400/40 transition-colors bg-navy-900 shrink-0">
              <img
                src={testimonial.avatar_url || getAvatar(testimonial.name)}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-lightgray-100 font-black tracking-tight uppercase text-[11px] truncate">{testimonial.name}</h4>
              <p className="text-[9px] text-coral-400 font-bold uppercase tracking-widest truncate">{testimonial.role}</p>
            </div>
          </div>

          <p className="text-lightgray-300 text-xs italic leading-relaxed font-medium mb-4 line-clamp-4">
            "{testimonial.content}"
          </p>

          <div className="flex items-center gap-1 pt-4 border-t border-white/5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 ${i < testimonial.rating ? "text-coral-400 fill-coral-400" : "text-white/10"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ScrollingColumn = ({ items, reverse = false, speed = 40 }: { items: Testimonial[]; reverse?: boolean; speed?: number }) => {
  return (
    <div className="relative h-[650px] overflow-hidden group/column">
      <motion.div
        animate={{
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col hover:[animation-play-state:paused]"
      >
        {[...items, ...items].map((item, idx) => (
          <TestimonialCard key={`${item.id}-${idx}`} testimonial={item} />
        ))}
      </motion.div>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-700 via-navy-700/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-700 via-navy-700/80 to-transparent z-20 pointer-events-none" />
    </div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("published", true)
          .order("order_index", { ascending: true })

        if (error) throw error
        setTestimonials(data || [])
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  if (!loading && testimonials.length === 0) return null

  const col1 = testimonials.filter((_, i) => i % 3 === 0)
  const col2 = testimonials.filter((_, i) => i % 3 === 1)
  const col3 = testimonials.filter((_, i) => i % 3 === 2)

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-navy-700">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Testimonials"
          subtitle="What my clients and partners say about our collaboration"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto items-start">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[600px] rounded-[2.5rem] bg-navy-800/40 border border-white/5 animate-pulse" />
            ))
          ) : (
            <>
              {/* Sides moving DOWN (reverse=true), Middle moving UP (reverse=false) */}
              <ScrollingColumn items={col1} reverse={true} speed={55} />
              <ScrollingColumn items={col2} reverse={false} speed={45} />
              <ScrollingColumn items={col3} reverse={true} speed={65} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
