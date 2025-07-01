"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  ExternalLink,
  Github,
  Globe,
  Sparkles,
  BookOpen,
  Car,
  Heart,
  Laptop,
  Server,
  FileCode,
  Flame,
  Users,
  Pill,
  Code,
  Brain,
} from "lucide-react"
import SectionHeading from "./SectionHeading"

// 3D Card effect component
const Card3D = ({ children }: { children: React.ReactNode }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = (y - centerY) / 10
    const rotateYValue = (centerX - x) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className="h-full perspective-1000"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [
    { id: "Web", label: "Web Apps", icon: <Globe className="w-4 h-4" /> },
    { id: "FiveM", label: "FiveM", icon: <Car className="w-4 h-4" /> },
    { id: "Python", label: "Python", icon: <FileCode className="w-4 h-4" /> },
    { id: "IoT", label: "IoT", icon: <Laptop className="w-4 h-4" /> },
  ]

  const projects = [
    // Featured Live Projects
    {
      title: "Al Quran Institute",
      description: "Educational platform for Quran studies with course registration and management",
      techStack: "WordPress (Soon to be Next.js)",
      link: "https://alquraninstitute.net/",
      icon: <BookOpen className="w-6 h-6 text-coral-400" />,
      type: "live",
      category: "Web",
      featured: true,
      pinned: true,
    },
    {
      title: "BrightBrainAI",
      description: "AI-powered solutions platform with modern interface and interactive features",
      techStack: "WordPress",
      link: "https://brightbrainai.com/",
      icon: <Brain className="w-6 h-6 text-lightgray-300" />,
      type: "live",
      category: "Web",
      featured: true,
      pinned: true,
    },
    {
      title: "The Commonwealth RP - FiveM Roleplay Server",
      description: "Are you looking to elevate your streaming content with a truly immersive, cinematic FiveM roleplay experience?",
      techStack: "Next.jS, Tailwind",
      link: "https://thecommonwealthrp.com/",
      icon: <Code className="w-6 h-6 text-coral-400" />,
      type: "live",
      category: "Web",
      featured: true,
      pinned: true,
    },
    {
      title: "The Reflection RP - Chinese FiveM Roleplay Server",
      description: "This is Traditional Chinese - So No Description ",
      techStack: "Next.jS, Tailwind",
      link: "https://www.dragon1688888.com/",
      icon: <Code className="w-6 h-6 text-coral-400" />,
      type: "live",
      category: "Web",
      featured: true,
      pinned: true,
    },
    {
      title: "BlazedRP - FiveM Roleplay Server",
      description: "Experience next-level roleplay in our meticulously crafted world with custom jobs, properties, and a thriving economy.",
      techStack: "Next.jS, Tailwind",
      link: "https://blazerp.lt/",
      icon: <Code className="w-6 h-6 text-coral-400" />,
      type: "live",
      category: "Web",
    },
    {
      title: "GSRP FiveM Website",
      description: "Join Georgia State Role Play, a premier FiveM roleplay server featuring law enforcement, emergency services, and realistic civilian life.",
      techStack: "Next.jS, Tailwind, FiveM API",
      link: "https://gsrp-three.vercel.app/",
      icon: <Code className="w-6 h-6 text-coral-400" />,
      type: "live",
      category: "Web",
      featured: true,
      pinned: true,
    },
    {
      title: "Peaky Blinders | Cops and Robbers V Crew Website",
      description: "Join the dominant force in FiveM's Cops and Robbers. From high-stakes heists to law enforcement takeovers, Peaky Blinders plays hard and fair.",
      techStack: "Next.jS, Tailwind, FiveM API, CNRV API",
      link: "https://peakyblindercnrv.vercel.app/",
      icon: <Code className="w-6 h-6 text-lightgray-300" />,
      type: "live",
      category: "Web",
    },

    // FiveM Projects
    {
      title: "Lunar Contact Admin",
      description: "Admin panel for managing player donations and experience in FiveM servers",
      techStack: "Lua, JavaScript, ox_lib",
      link: "https://github.com/Shafat21/Lunar-Contact-Admin",
      icon: <Car className="w-6 h-6 text-coral-400" />,
      type: "github",
      category: "FiveM",
      featured: true,
    },
    {
      title: "Ambulance Job System",
      description: "Comprehensive ambulance job and EMS system for FiveM roleplay servers",
      techStack: "Lua, JavaScript, ESX Framework",
      link: "https://github.com/Shafat21/shafat_ambulancejob",
      icon: <Heart className="w-6 h-6 text-coral-400" />,
      type: "github",
      category: "FiveM",
    },
    {
      title: "Hen Hunting System",
      description: "Hunting system with realistic mechanics for FiveM roleplay servers",
      techStack: "Lua, JavaScript, QBCore",
      link: "https://github.com/Shafat21/shafat_henhunting",
      icon: <Car className="w-6 h-6 text-coral-400" />,
      type: "github",
      category: "FiveM",
    },
    {
      title: "smAidoc",
      description: "Medical documentation and healthcare system for FiveM roleplay servers",
      techStack: "Lua, JavaScript, ESX Framework",
      link: "https://github.com/Shafat21/smAidoc",
      icon: <Car className="w-6 h-6 text-coral-400" />,
      type: "github",
      category: "FiveM",
    },

    // Web Projects
    {
      title: "Blogging Website",
      description: "Full-featured blogging platform with user authentication and content management",
      techStack: "React.js, Firebase, MongoDB",
      link: "https://github.com/Shafat21/Blogging-Website-with-ReactJS",
      icon: <BookOpen className="w-6 h-6 text-lightgray-300" />,
      type: "github",
      category: "Web",
    },
    {
      title: "ProManage EMS",
      description: "Employee Management System with comprehensive HR and administrative features",
      techStack: "PHP, MySQL, Bootstrap",
      link: "https://github.com/Shafat21/ProManage",
      icon: <Users className="w-6 h-6 text-coral-400" />,
      type: "github",
      category: "Web",
    },
    {
      title: "Pharmacy Management",
      description: "Inventory and sales management system for pharmacies with CRUD operations",
      techStack: "React.js, Node.js, MongoDB",
      link: "https://github.com/Shafat21/React-Crud-Operation-Pharmacy-management",
      icon: <Pill className="w-6 h-6 text-lightgray-300" />,
      type: "github",
      category: "Web",
    },

    // Python Projects
    {
      title: "FTP Client & Server",
      description: "Custom implementation of FTP protocol with client and server components",
      techStack: "Python, Socket Programming",
      link: "https://github.com/Shafat21/FTP-Server-Client",
      icon: <Server className="w-6 h-6 text-coral-400" />,
      type: "github",
      category: "Python",
    },

    // IoT Projects
    {
      title: "Smart Fire & Gas Detector",
      description: "IoT-based system for detecting fire and gas leaks with real-time alerts",
      techStack: "Arduino, Sensors, IoT Protocols",
      link: "https://github.com/Shafat21/Smart-IoT-Fire-and-Gas-Detector",
      icon: <Flame className="w-6 h-6 text-coral-400" />,
      type: "github",
      category: "IoT",
    },
  ]

  // Sort projects to show pinned projects first, then featured, then the rest
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  const filteredProjects = activeCategory
    ? sortedProjects.filter((project) => project.category === activeCategory)
    : sortedProjects

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-navy-700">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-coral-400/10 via-navy-700 to-navy-800 z-0"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Projects"
          subtitle="Explore my portfolio of live websites, web applications, FiveM scripts, Python tools, and IoT projects"
        />

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
              activeCategory === null
                ? "bg-coral-400 text-navy-700"
                : "bg-navy-800 text-lightgray-300 hover:bg-navy-600"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>All Projects</span>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-coral-400 text-navy-700"
                  : "bg-navy-800 text-lightgray-300 hover:bg-navy-600"
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card3D>
                  {/* Card with 3D effect */}
                  <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl border border-coral-400/20 h-full flex flex-col overflow-hidden">
                    {/* Featured badge */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {project.pinned && (
                        <div className="px-2 py-1 bg-coral-500/30 backdrop-blur-sm rounded-full text-xs text-coral-400 flex items-center gap-1 border border-coral-500/40">
                          <Code className="w-3 h-3" />
                          <span>Pinned</span>
                        </div>
                      )}
                      {project.featured && (
                        <div className="px-2 py-1 bg-coral-400/20 backdrop-blur-sm rounded-full text-xs text-coral-400 flex items-center gap-1 border border-coral-400/30">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-full bg-navy-700 mr-4 border border-coral-400/20">
                          {project.icon}
                        </div>
                        <h3 className="text-xl font-bold text-lightgray-100 font-display">{project.title}</h3>
                      </div>

                      <p className="text-lightgray-300 mb-4">{project.description}</p>
                      <p className="text-sm text-lightgray-400 mb-6 mt-auto font-mono">{project.techStack}</p>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-coral-400 hover:bg-coral-500 text-navy-700 font-medium transition-all duration-300"
                      >
                        {project.type === "github" ? (
                          <>
                            <Github className="w-4 h-4" />
                            View on GitHub
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4" />
                            Visit Website
                          </>
                        )}
                      </a>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
