"use client"

import { motion } from "framer-motion"
import { Car, Code, Database, Server, Layers, Shield, Users, Settings, Zap } from "lucide-react"
import SectionHeading from "./SectionHeading"

// Feature card component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: any
  title: string
  description: string
  index: number
}) => {
  return (
    <motion.div
      className="bg-navy-800/80 backdrop-blur-md p-6 rounded-xl border border-coral-400/20 hover:border-coral-400/40 transition-all duration-300 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(247, 155, 114, 0.2)" }}
    >
      <div className="p-3 rounded-full bg-coral-400/20 w-fit mb-4">
        <Icon className="w-6 h-6 text-coral-400" />
      </div>
      <h3 className="text-xl font-bold text-lightgray-100 mb-3">{title}</h3>
      <p className="text-lightgray-300">{description}</p>
    </motion.div>
  )
}

// Animated code snippet component
const CodeSnippet = () => {
  const code = `-- Server-side economy system
RegisterServerEvent("banking:deposit")
function(source, amount)
    local xPlayer = ESX.GetPlayerFromId(source)
    local balance = xPlayer.getAccount('bank').money
    
    if amount > 0 and xPlayer.getMoney() >= amount then
        xPlayer.removeMoney(amount)
        xPlayer.addAccountMoney('bank', amount)
        TriggerClientEvent('banking:updateBalance', source, balance + amount)
        TriggerClientEvent('banking:notify', source, "Deposit successful: $" .. amount)
    else
        TriggerClientEvent  source, "Deposit successful: $" .. amount)
    else
        TriggerClientEvent('banking:notify', source, "Invalid amount or insufficient funds")
    end
end)`

  return (
    <motion.div
      className="bg-navy-900 rounded-xl overflow-hidden border border-coral-400/20 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-navy-800 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-sm text-lightgray-300">banking_system.lua</div>
      </div>
      <div className="p-4 font-mono text-sm text-lightgray-300 overflow-x-auto">
        {code.split("\n").map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="whitespace-pre"
          >
            {line}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function FiveM() {
  const features = [
    {
      icon: Car,
      title: "Custom Vehicle Systems",
      description:
        "Develop advanced vehicle systems including custom handling, damage models, and unique vehicle features for enhanced roleplay experiences.",
    },
    {
      icon: Database,
      title: "Economy & Banking",
      description:
        "Create robust economy systems with banking, ATMs, money laundering, and financial tracking to provide realistic economic gameplay.",
    },
    {
      icon: Users,
      title: "Job & Business Systems",
      description:
        "Design comprehensive job frameworks and business management systems that allow players to work, earn, and build their careers.",
    },
    {
      icon: Shield,
      title: "Police & Emergency",
      description:
        "Implement detailed police, medical, and emergency systems with realistic procedures, equipment, and interactive scenarios.",
    },
    {
      icon: Layers,
      title: "Housing & Property",
      description:
        "Develop property systems with customizable interiors, furniture placement, and property management for immersive living experiences.",
    },
    {
      icon: Settings,
      title: "Server Optimization",
      description:
        "Optimize server performance through efficient code practices, resource management, and server configuration for smooth gameplay.",
    },
  ]

  return (
    <section id="fivem" className="py-20 relative overflow-hidden bg-navy-700">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-coral-400/10 via-navy-700 to-navy-800 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="FiveM Development"
          subtitle="Creating immersive roleplay experiences with custom scripts and systems"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-lightgray-100 mb-6 font-display">
              Custom FiveM Development Solutions
            </h3>
            <p className="text-xl text-lightgray-300 mb-6">
              Specializing in creating custom scripts and systems for FiveM roleplay servers that enhance player
              experience and server functionality.
            </p>
            <p className="text-xl text-lightgray-300 mb-8">
              From economy systems to job frameworks, vehicle customizations to property management - I build
              comprehensive solutions tailored to your server's unique needs.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-coral-400/20 rounded-full text-coral-400 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>QBCore Framework</span>
              </div>
              <div className="px-4 py-2 bg-lightgray-300/20 rounded-full text-lightgray-300 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>ESX Framework</span>
              </div>
              <div className="px-4 py-2 bg-coral-400/20 rounded-full text-coral-400 flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>Lua Scripting</span>
              </div>
              <div className="px-4 py-2 bg-lightgray-300/20 rounded-full text-lightgray-300 flex items-center gap-2">
                <Server className="w-4 h-4" />
                <span>Server Optimization</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CodeSnippet />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
