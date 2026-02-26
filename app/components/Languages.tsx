import React from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Globe } from "lucide-react"
import SectionHeading from "./SectionHeading"

const LanguageCard = ({
  name,
  proficiency,
  level,
  index,
}: {
  name: string
  proficiency: string
  level: number
  index: number
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative p-8 rounded-[2.5rem] bg-navy-800/40 backdrop-blur-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-coral-400/30 hover:-translate-y-2 flex flex-col items-center text-center">
        {/* Magnetic Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(247,155,114,0.08), transparent 80%)`
            ),
          }}
        />

        <div className="relative z-10 w-full">
          <div className="w-16 h-16 rounded-2xl bg-navy-900 border border-white/5 flex items-center justify-center text-coral-400 mx-auto mb-6 group-hover:scale-110 group-hover:text-lightgray-100 transition-all duration-500 shadow-inner overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-8 h-8" />
            </motion.div>
          </div>

          <h3 className="text-3xl font-black text-lightgray-100 mb-2 tracking-tighter uppercase group-hover:text-coral-400 transition-colors">
            {name}
          </h3>
          <p className="text-lightgray-300 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-8">
            {proficiency}
          </p>

          <div className="flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-8 rounded-full transition-all duration-700 ${i < level
                  ? "bg-coral-400 shadow-[0_0_15px_rgba(247,155,114,0.4)]"
                  : "bg-white/5"
                  }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  transform: i < level ? "scaleY(1)" : "scaleY(0.6)"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Languages() {
  const languages = [
    {
      name: "Bangla",
      proficiency: "Native Proficiency",
      level: 5,
    },
    {
      name: "English",
      proficiency: "Professional Working Proficiency",
      level: 4,
    },
  ]

  return (
    <section id="languages" className="py-24 relative overflow-hidden bg-navy-700">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(247,155,114,0.03),transparent_70%)] opacity-50 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Languages"
          subtitle="Proficiency in multiple languages for global communication"
        />

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {languages.map((lang, index) => (
            <LanguageCard
              key={index}
              name={lang.name}
              proficiency={lang.proficiency}
              level={lang.level}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
