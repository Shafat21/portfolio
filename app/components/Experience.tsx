"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, Zap } from "lucide-react"
import SectionHeading from "./SectionHeading"

export default function Experience() {
  const experiences = [
    {
      period: "Present",
      role: "Project Manager",
      company: "Al Quran Institute",
      website: "alquraninstitute.net",
      color: "coral",
      projects: [
        {
          title: "🌐 Website Management & Development",
          description:
            "Managing the institute's website, overseeing content updates, user registrations, and technical support for online Quran study courses.",
        },
        {
          title: "📱 Course Registration System",
          description:
            "Implementing and maintaining the online registration system for various modules and courses offered by the institute.",
        },
        {
          title: "📋 Project Coordination & Team Management",
          description:
            "Coordinating between technical teams and educational staff to ensure smooth operation of the online learning platform.",
        },
      ],
    },
    {
      period: "Present",
      role: "Web Developer",
      company: "BrightBrainAI",
      website: "brightbrainai.com",
      color: "lightgray",
      projects: [
        {
          title: "🌐 AI-Powered Web Applications",
          description:
            "Developing web applications with AI integration, focusing on user experience and modern design principles.",
        },
        {
          title: "🛠️ Frontend Development",
          description:
            "Building responsive and interactive user interfaces using modern JavaScript frameworks and libraries.",
        },
        {
          title: "🔄 API Integration",
          description: "Implementing API connections between frontend applications and backend AI services.",
        },
      ],
    },
    {
      period: "Oct 2020 - Feb 2021",
      role: "Front-end Developer Intern",
      company: "Dragon Design Studio",
      website: "dragondesignstudio.com",
      color: "coral",
      projects: [
        {
          title: "🎨 UI Development",
          description:
            "Assisted in developing user interfaces for client websites, focusing on responsive design and cross-browser compatibility.",
        },
        {
          title: "🖼️ Web Design Implementation",
          description: "Converted design mockups into functional web pages using HTML, CSS, and JavaScript.",
        },
        {
          title: "🔍 Quality Assurance",
          description:
            "Participated in testing and debugging web applications to ensure optimal performance and user experience.",
        },
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-navy-700">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-coral-400/10 via-navy-700 to-navy-800 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Experience" />

        <div className="max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="mb-12 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute top-16 bottom-0 left-8 w-0.5 bg-gradient-to-b from-coral-400 to-lightgray-300">
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-lightgray-100"
                    animate={{
                      y: [0, 100, 200, 300, 400],
                      opacity: [1, 0.8, 0.6, 0.4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </div>
              )}

              <div className="flex items-start">
                {/* Timeline dot */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center z-10 relative border border-coral-400/30">
                    <Briefcase className={`w-8 h-8 text-${exp.color}-400`} />
                  </div>
                </div>

                {/* Content */}
                <div className="ml-8 bg-navy-800/80 backdrop-blur-md p-6 rounded-2xl border border-coral-400/20 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-lightgray-100 flex items-center gap-2 font-display">
                      <Zap className={`w-5 h-5 text-${exp.color}-400`} />
                      {exp.role}
                    </h3>
                    <div className="flex items-center text-coral-400 mt-2 md:mt-0">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <MapPin className="w-4 h-4 text-lightgray-300 mr-1" />
                    <span className="text-lightgray-300">{exp.company}</span>
                    {exp.website && (
                      <a
                        href={`https://${exp.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-coral-400 hover:text-coral-300 transition-colors"
                      >
                        ({exp.website})
                      </a>
                    )}
                  </div>

                  <div className="space-y-4">
                    {exp.projects.map((project, i) => (
                      <motion.div
                        key={i}
                        className="bg-navy-700/50 p-4 rounded-xl border border-navy-600/50 group hover:border-coral-400/30 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                      >
                        <h4 className="text-lg font-semibold text-lightgray-100 mb-2">{project.title}</h4>
                        <p className="text-lightgray-300">{project.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
