"use client"

import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { motion } from "framer-motion"

// Education card component
const EducationCard = ({
  degree,
  institution,
  period,
  additional,
  icon: Icon,
  index,
}: {
  degree: string
  institution: string
  period: string
  additional: string
  icon: any
  index: number
}) => {
  return (
    <motion.div
      className="bg-navy-800/90 backdrop-blur-md p-6 rounded-xl border border-coral-400/20 shadow-lg hover:border-coral-400/40 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-coral-400/20 mr-4">
          <Icon className="w-6 h-6 text-coral-400" />
        </div>
        <h3 className="text-2xl font-bold text-lightgray-100 font-display">{degree}</h3>
      </div>
      <p className="text-xl text-lightgray-300 mb-2">{institution}</p>
      <p className="text-lightgray-400 flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        {period}
      </p>
      <p className="text-lightgray-300 font-medium mt-2">{additional}</p>
    </motion.div>
  )
}

export default function Education() {
  // Update the education array with the new information
  const education = [
    {
      degree: "BSc in Software Engineering",
      institution: "Metropolitan University",
      period: "Oct 2021 – December 2025 (running)",
      additional: "CGPA: 3.48 running",
      icon: BookOpen,
    },
    {
      degree: "Intermediate (12th Grade) [HSC]",
      institution: "Jalalabad Cantonment Public School and College, Sylhet",
      period: "July 2018 – March 2020",
      additional: "Percentage: 100%",
      icon: Award,
    },
    {
      degree: "10th Grade [SSC]",
      institution: "Jalalabad Cantonment Public School and College, Sylhet",
      period: "January 2016 – February 2018",
      additional: "Percentage: 94%",
      icon: GraduationCap,
    },
  ]

  return (
    <section id="education" className="py-20 relative overflow-hidden bg-navy-700">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-coral-400/10 via-navy-700 to-navy-800 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Education" />

        <div className="max-w-4xl mx-auto space-y-6 mt-12">
          {education.map((edu, index) => (
            <EducationCard
              key={index}
              degree={edu.degree}
              institution={edu.institution}
              period={edu.period}
              additional={edu.additional}
              icon={edu.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
