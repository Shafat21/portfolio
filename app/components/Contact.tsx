import React, { useState } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { Mail, MessageSquare, Github, Send, Loader2, CheckCircle2 } from "lucide-react"
import SectionHeading from "./SectionHeading"

const ContactCard = ({
  icon: Icon,
  title,
  content,
  link,
  delay,
  brandColor,
}: {
  icon: any
  title: string
  content: string
  link: string
  delay: number
  brandColor: string
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative block w-full"
    >
      <div className="relative p-6 rounded-[2rem] bg-navy-800/30 backdrop-blur-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-coral-400/30 hover:-translate-y-1 flex items-center gap-5">
        <div
          className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: brandColor }}
        />

        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(247,155,114,0.06), transparent 80%)`
            ),
          }}
        />

        <div className="relative z-10 w-12 h-12 rounded-xl bg-navy-900 border border-white/5 flex items-center justify-center text-coral-400 group-hover:scale-110 group-hover:text-lightgray-100 transition-all duration-500 shrink-0">
          <Icon className="w-6 h-6" />
        </div>

        <div className="relative z-10 min-w-0">
          <h3 className="text-sm font-black text-lightgray-100 tracking-tight uppercase group-hover:text-coral-400 transition-colors">
            {title}
          </h3>
          <p className="text-[10px] text-lightgray-400 font-medium opacity-60 truncate">
            {content}
          </p>
        </div>
      </div>
    </motion.a>
  )
}

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    const formData = new FormData(e.currentTarget)
    formData.append("access_key", "e3f3765b-8e31-4a85-9f05-e59cdb3cf8a8") // Web3Forms Access Key
    formData.append("subject", "New Portfolio Message")
    formData.append("from_name", "Portfolio Contact Form")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      }).then((res) => res.json())

      if (res.success) {
        setStatus("success")
        setTimeout(() => setStatus("idle"), 5000)
          ; (e.target as HTMLFormElement).reset()
      } else {
        setStatus("error")
      }
    } catch (err) {
      setStatus("error")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative p-8 lg:p-12 rounded-[3rem] bg-navy-800/40 backdrop-blur-3xl border border-white/5 overflow-hidden"
    >
      {/* Background ambience */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-coral-400/5 blur-[100px] -z-10" />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lightgray-400 ml-4">Identifier</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-6 py-4 rounded-2xl bg-navy-900/50 border border-white/5 text-lightgray-100 text-sm focus:border-coral-400/40 focus:outline-none transition-all duration-300 placeholder:text-lightgray-500/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lightgray-400 ml-4">Portal Address</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-6 py-4 rounded-2xl bg-navy-900/50 border border-white/5 text-lightgray-100 text-sm focus:border-coral-400/40 focus:outline-none transition-all duration-300 placeholder:text-lightgray-500/30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lightgray-400 ml-4">Transmission Content</label>
          <textarea
            name="message"
            placeholder="Type your message here..."
            required
            rows={5}
            className="w-full px-6 py-4 rounded-[2rem] bg-navy-900/50 border border-white/5 text-lightgray-100 text-sm focus:border-coral-400/40 focus:outline-none transition-all duration-300 placeholder:text-lightgray-500/30 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative w-full py-5 rounded-[2rem] bg-coral-400 text-navy-900 font-black uppercase tracking-[0.3em] text-xs overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(247,155,114,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {status === "sending" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === "success" ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Mail Sent
              </>
            ) : (
              <>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Send Mail
              </>
            )}
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        </button>
      </form>
    </motion.div>
  )
}

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Direct Email",
      content: "shafat.mahtab@gmail.com",
      link: "mailto:shafat.mahtab@gmail.com",
      delay: 0.1,
      brandColor: "#F79B72",
    },
    {
      icon: MessageSquare,
      title: "Discord HQ",
      content: "Discord ID: 493042603181342730",
      link: "https://discord.com/users/493042603181342730",
      delay: 0.2,
      brandColor: "#5865F2",
    },
    {
      icon: Github,
      title: "Source Hub",
      content: "github.com/Shafat21",
      link: "https://github.com/Shafat21",
      delay: 0.3,
      brandColor: "#FFFFFF",
    },
  ]

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-navy-700">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Connect Terminal"
          subtitle="Ready for collaboration, consultation, and high-impact digital ventures"
        />

        <div className="max-w-7xl mx-auto mt-16 flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-coral-400 mb-2 ml-4">Establish Connection</h4>
            {contactMethods.map((method, index) => (
              <ContactCard key={index} {...method} />
            ))}
          </div>

          <div className="w-full lg:w-2/3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-coral-400 mb-6 ml-4 lg:ml-8">Message Terminal</h4>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
