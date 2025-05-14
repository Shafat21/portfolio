"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react"
import SectionHeading from "./SectionHeading"

// Contact card component
const ContactCard = ({
  icon: Icon,
  title,
  content,
  link,
  delay,
  color = "coral",
}: {
  icon: any
  title: string
  content: string
  link: string
  delay: number
  color?: string
}) => {
  const colors = {
    coral: "from-coral-400/20 to-coral-400/5 border-coral-400/30 hover:border-coral-400/50",
    navy: "from-navy-600/20 to-navy-600/5 border-navy-600/30 hover:border-navy-600/50",
    gray: "from-lightgray-300/20 to-lightgray-300/5 border-lightgray-300/30 hover:border-lightgray-300/50",
  }

  const bgColor = colors[color as keyof typeof colors] || colors.coral

  return (
    <motion.a
      href={link}
      className={`bg-gradient-to-br ${bgColor} backdrop-blur-md p-8 rounded-xl border transition-all duration-300 hover:-translate-y-2 group shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="w-16 h-16 rounded-full bg-navy-700 flex items-center justify-center mb-6 group-hover:bg-navy-600 transition-colors duration-300">
        <Icon
          className={`w-8 h-8 text-${color === "coral" ? "coral" : color === "navy" ? "lightgray" : "coral"}-400`}
        />
      </div>
      <h3 className="text-2xl font-bold text-lightgray-100 mb-3">{title}</h3>
      <p className="text-lightgray-300 mb-4">{content}</p>
      <div className="flex items-center text-coral-400 text-sm">
        <span>Connect</span>
        <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-navy-700">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-coral-400/10 via-navy-700 to-navy-800 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Let's Connect" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <ContactCard
            icon={Mail}
            title="Email"
            content="shafat.mahtab@gmail.com"
            link="mailto:shafat.mahtab@gmail.com"
            delay={0.1}
            color="coral"
          />

          <ContactCard
            icon={Phone}
            title="Discord"
            content="Discord ID: 493042603181342730"
            link="https://discord.com/users/493042603181342730"
            delay={0.2}
            color="navy"
          />

          <ContactCard
            icon={MapPin}
            title="GitHub"
            content="github.com/Shafat21"
            link="https://github.com/Shafat21"
            delay={0.3}
            color="gray"
          />
        </div>
      </div>
    </section>
  )
}
