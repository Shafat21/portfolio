"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, PencilRuler, FileText, Layers, Cloud, Network, Code2 } from "lucide-react"
import SectionHeading from "./SectionHeading"

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-400/10 via-navy-700 to-navy-800 z-0"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-coral-400/30"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skill-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skill-grid)" />
        </svg>
      </div>
    </div>
  )
}

// Skill card component
const SkillCard = ({
  icon: Icon,
  title,
  technologies,
  description,
  color = "coral",
}: {
  icon: any
  title: string
  technologies: string
  description: string
  color?: string
}) => {
  const colors = {
    coral: "from-coral-400/20 to-coral-400/5 border-coral-400/20 text-coral-400",
    lightgray: "from-lightgray-300/20 to-lightgray-300/5 border-lightgray-300/20 text-lightgray-300",
  }

  const colorClass = colors[color as keyof typeof colors] || colors.coral

  return (
    <motion.div
      className={`bg-gradient-to-br ${colorClass} backdrop-blur-md p-6 rounded-xl border hover:border-opacity-50 transition-all duration-300 h-full`}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(247, 155, 114, 0.2)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-navy-800 mr-4 border border-navy-600">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-lightgray-100 font-display">{title}</h3>
      </div>
      <p className="text-sm text-lightgray-300 font-mono mb-4">{technologies}</p>
      <p className="text-lightgray-300">{description}</p>
    </motion.div>
  )
}

export default function Skills() {
  const skills = [
    {
      icon: Code,
      title: "Front-End Development",
      technologies: "HTML, CSS, JavaScript, React.js",
      description: "Building modern, responsive user interfaces with React.js and core front-end technologies.",
      color: "coral",
    },
    {
      icon: Server,
      title: "Back-End Development",
      technologies: "Node.js, Express, PHP",
      description: "Developing scalable back-end solutions with multiple programming languages.",
      color: "lightgray",
    },
    {
      icon: Layers,
      title: "Frameworks & Stacks",
      technologies: "MERN, Next.js, Laravel",
      description: "Expertise in full-stack development using modern frameworks for web applications.",
      color: "coral",
    },
    {
      icon: Database,
      title: "Databases",
      technologies: "MongoDB, MySQL",
      description: "Efficient database design and management for optimal data handling.",
      color: "lightgray",
    },
    {
      icon: Network,
      title: "FiveM Development",
      technologies: "Lua, JavaScript, QBCore, ESX",
      description: "Creating custom scripts, systems, and servers for the FiveM platform.",
      color: "coral",
    },
    {
      icon: Code2,
      title: "Discord Bot Development",
      technologies: "Discord.js, Node.js",
      description: "Building custom Discord bots with advanced features and integrations.",
      color: "lightgray",
    },
    {
      icon: Cloud,
      title: "Web Design",
      technologies: "Figma, Adobe XD, Photoshop",
      description: "Creating visually appealing and user-friendly web designs and interfaces.",
      color: "coral",
    },
    {
      icon: PencilRuler,
      title: "UI/UX Design",
      technologies: "Wireframing, Prototyping",
      description: "Designing intuitive user interfaces and seamless user experiences.",
      color: "lightgray",
    },
    {
      icon: FileText,
      title: "Version Control",
      technologies: "Git, GitHub",
      description: "Managing code versions and collaborating effectively with other developers.",
      color: "coral",
    },
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-navy-700">
      <AnimatedBackground />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Technical Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              icon={skill.icon}
              title={skill.title}
              technologies={skill.technologies}
              description={skill.description}
              color={index % 2 === 0 ? "coral" : "lightgray"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
