"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Code,
  GraduationCap,
  MessageSquare,
  Cpu,
  ChevronUp,
  Car,
  Star
} from "lucide-react"
import { smoothScrollTo } from "@/utils/smoothScroll"

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code },
  { id: "fivem", label: "FiveM", icon: Car },
  { id: "projects", label: "Projects", icon: Cpu },
  { id: "testimonials", label: "Reviews", icon: Star },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: MessageSquare },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    // Intersection Observer for active section
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Focus on top-ish part of the screen
      threshold: 0,
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.current?.observe(element)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.current?.disconnect()
    }
  }, [])

  const handleNavClick = (id: string) => {
    smoothScrollTo(id)
    setIsOpen(false)
    setActiveSection(id)
  }

  return (
    <>
      {/* Floating Center Dock Navigation */}
      <div className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`pointer-events-auto flex items-center bg-navy-800/60 backdrop-blur-xl border border-coral-400/20 rounded-full px-2 py-2 shadow-2xl transition-all duration-500`}
        >
          {/* Logo / Home Button */}
          <button
            onClick={() => handleNavClick("hero")}
            className="hidden lg:flex items-center gap-3 px-4 py-2 mr-2 group"
          >
            <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-coral-400 to-coral-600 rounded-xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full h-full bg-navy-900 rounded-xl border border-coral-400/30 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="DevShafat Logo"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    // Fallback if logo fails
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.innerHTML = '<span class="text-coral-400 font-black text-2xl">S</span>'
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-xl font-black tracking-tighter text-lightgray-100 group-hover:text-coral-400 transition-colors">
                Dev<span className="text-coral-400 group-hover:text-lightgray-100">Shafat</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-coral-400/60 font-bold">Portfolio</span>
            </div>
          </button>

          <div className="h-6 w-px bg-coral-400/20 mx-2 hidden lg:block" />

          {/* Desktop Items */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all group overflow-hidden ${isActive ? "text-navy-700" : "text-lightgray-300 hover:text-coral-400"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeDock"
                        className="absolute inset-0 bg-coral-400"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 relative z-10 ${isActive ? "text-navy-700" : ""}`} />
                    <span className="text-xs font-bold relative z-10">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Mobile Items Mini Version */}
          <div className="md:hidden flex items-center gap-2 px-2">
            <button
              onClick={() => handleNavClick("hero")}
              className={`p-2 rounded-full ${activeSection === "hero" ? "bg-coral-400 text-navy-700" : "text-lightgray-100"}`}
            >
              <Home className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-coral-400/10 p-2 rounded-full text-coral-400 border border-coral-400/20"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-900/95 backdrop-blur-2xl flex flex-col p-8 sm:p-12 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-navy-900 rounded-xl border border-coral-400/30 flex items-center justify-center overflow-hidden">
                  <img
                    src="/android-chrome-512x512.png"
                    alt="DevShafat Logo"
                    className="w-6 h-6 object-contain filter brightness-0 invert"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement!.innerHTML = '<span class="text-coral-400 font-black text-xl">D</span>'
                    }}
                  />
                </div>
                <span className="text-2xl font-black text-lightgray-100 tracking-tighter">
                  Dev<span className="text-coral-400">Shafat</span>
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-2xl bg-coral-400/10 border border-coral-400/20 flex items-center justify-center text-coral-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1">
              <ul className="space-y-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`group w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isActive
                          ? "bg-coral-400 border-coral-500 shadow-lg shadow-coral-400/20"
                          : "bg-navy-800/50 border-navy-700 hover:border-coral-400/30"
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? "bg-navy-700/20" : "bg-navy-700 group-hover:bg-coral-400/20"
                            }`}>
                            <Icon className={`w-5 h-5 ${isActive ? "text-navy-700" : "text-coral-400"}`} />
                          </div>
                          <span className={`text-lg font-bold ${isActive ? "text-navy-700" : "text-lightgray-100"}`}>
                            {item.label}
                          </span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${isActive ? "bg-navy-700" : "bg-coral-400/20"}`} />
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            <div className="pt-8 border-t border-navy-800 mt-auto">
              <p className="text-lightgray-300/40 text-xs font-mono uppercase tracking-widest text-center">
                Built with passion & code
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => smoothScrollTo("hero")}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-coral-400 hover:bg-coral-500 text-navy-700 rounded-2xl shadow-2xl flex items-center justify-center group overflow-hidden"
            initial={{ y: 100, rotate: 180, scale: 0 }}
            animate={{ y: 0, rotate: 0, scale: 1 }}
            exit={{ y: 100, rotate: -180, scale: 0 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20 -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            />
            <ChevronUp className="w-6 h-6 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
