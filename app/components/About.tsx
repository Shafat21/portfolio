"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Brain, Clipboard, Settings } from "lucide-react"
import SectionHeading from "./SectionHeading"

// Particle animation component
const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
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
  )
}

export default function About() {
  const skills = [
    {
      icon: <Code className="w-8 h-8 text-coral-400" />,
      title: "Frontend",
      description: "HTML, CSS, JavaScript, React.js",
    },
    {
      icon: <Server className="w-8 h-8 text-lightgray-300" />,
      title: "Backend",
      description: "Python, Java, C, C++, Node.js, Express.js",
    },
    {
      icon: <Database className="w-8 h-8 text-coral-400" />,
      title: "Database",
      description: "MySQL, MongoDB",
    },
    {
      icon: <Brain className="w-8 h-8 text-lightgray-300" />,
      title: "AI/ML",
      description: "Machine Learning, Deep Learning, Data Science",
    },
    {
      icon: <Clipboard className="w-8 h-8 text-coral-400" />,
      title: "Project Management",
      description: "Agile, Leadership",
    },
    {
      icon: <Settings className="w-8 h-8 text-lightgray-300" />,
      title: "Other",
      description: "Salesforce, Cloud Computing",
    },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-navy-700">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-coral-400/10 via-navy-700 to-navy-800 z-0"></div>
      <ParticleField />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="About Me" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-navy-800/80 backdrop-blur-md p-8 rounded-2xl border border-coral-400/20">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-full bg-coral-400/20 mr-4">
                  <Brain className="w-6 h-6 text-coral-400" />
                </div>
                <h3 className="text-2xl font-bold text-lightgray-100 font-display">
                  Full-Stack Developer & AI Engineer
                </h3>
              </div>

              <p className="text-xl text-lightgray-300 leading-relaxed mb-6">
                Specializing in Web Design, Web Development, FiveM Development, and Discord Bot Development. Skilled in
                modern web technologies and frameworks with a focus on creating engaging user experiences.
              </p>
              <p className="text-xl text-lightgray-300 leading-relaxed">
                Passionate about building innovative digital solutions and bringing creative ideas to life through code.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-navy-800/80 backdrop-blur-md p-6 rounded-2xl border border-coral-400/20 group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="bg-navy-700 p-3 rounded-xl inline-block mb-4 group-hover:bg-coral-400/20 transition-colors duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-lightgray-100">{skill.title}</h3>
                <p className="text-lightgray-300">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
