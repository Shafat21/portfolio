import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Car, Code, Database, Server, Layers, Shield, Users, Settings, Zap, Terminal, Box } from "lucide-react"
import SectionHeading from "./SectionHeading"

// Feature bento item
const FeatureItem = ({
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-[2rem] bg-navy-800/40 backdrop-blur-3xl border border-white/5 hover:border-coral-400/30 transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,_rgba(247,155,114,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-navy-900 border border-white/5 flex items-center justify-center text-coral-400 mb-4 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-black text-lightgray-100 mb-2 uppercase tracking-tight">{title}</h4>
        <p className="text-xs text-lightgray-400 leading-relaxed font-medium line-clamp-3">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

// Pro IDE Code Snippet
const ProCodeSnippet = () => {
  const codeLines = [
    { text: "-- Server-side economy system", color: "text-gray-500" },
    { text: 'RegisterServerEvent("banking:deposit")', color: "text-coral-400" },
    { text: "function(source, amount)", color: "text-blue-400" },
    { text: "    local xPlayer = ESX.GetPlayerFromId(source)", color: "text-lightgray-100" },
    { text: "    local balance = xPlayer.getAccount('bank').money", color: "text-lightgray-100" },
    { text: "    ", color: "" },
    { text: "    if amount > 0 and xPlayer.getMoney() >= amount then", color: "text-purple-400" },
    { text: "        xPlayer.removeMoney(amount)", color: "text-lightgray-100" },
    { text: "        xPlayer.addAccountMoney('bank', amount)", color: "text-lightgray-100" },
    { text: "        TriggerClientEvent('banking:updateBalance', source, balance + amount)", color: "text-green-400" },
    { text: '        TriggerClientEvent(\'banking:notify\', source, "Deposit success")', color: "text-green-400" },
    { text: "    else", color: "text-purple-400" },
    { text: '        TriggerClientEvent(\'banking:notify\', source, "Insufficient funds")', color: "text-red-400" },
    { text: "    end", color: "text-purple-400" },
    { text: "end)", color: "text-blue-400" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-navy-900/80 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative group h-full"
    >
      <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5 transition-colors group-hover:bg-coral-400/5">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-lightgray-400">
          <Terminal className="w-3 h-3" />
          banking_core.lua
        </div>
      </div>

      <div className="p-8 font-mono text-xs leading-relaxed overflow-x-auto scrollbar-hide">
        {codeLines.map((line, i) => (
          <div key={i} className="flex gap-4 group/line">
            <span className="w-4 text-white/10 text-right select-none">{i + 1}</span>
            <span className={`${line.color} transition-opacity duration-300`}>{line.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function FiveM() {
  const features = [
    {
      icon: Car,
      title: "Vehicle Meta",
      description: "Advanced handling, custom damage models, and interactive vehicle features.",
    },
    {
      icon: Database,
      title: "Economy Core",
      description: "Robust banking, ATM systems, and financial tracking for realistic gameplay.",
    },
    {
      icon: Users,
      title: "Job Systems",
      description: "Scalable frameworks for businesses, career paths, and player interaction.",
    },
    {
      icon: Shield,
      title: "Emergency Ops",
      description: "Detailed police and medical procedures with interactive equipment.",
    },
    {
      icon: Box,
      title: "Property & UI",
      description: "Custom housing systems with interactive interiors and management tools.",
    },
    {
      icon: Zap,
      title: "Optimization",
      description: "High-performance code practices ensuring smooth server-side synchronization.",
    },
  ]

  return (
    <section id="fivem" className="py-24 relative overflow-hidden bg-navy-700">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral-400/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="FiveM Development"
          subtitle="Engineering immersive virtual worlds with high-performance scripting"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-16 max-w-7xl mx-auto">
          {/* Narrative & Codeside */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-navy-800/40 backdrop-blur-2xl border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Settings className="w-32 h-32 animate-spin-slow" />
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-black text-lightgray-100 mb-6 uppercase tracking-tighter italic">
                  Professional <span className="text-coral-400">Scripting</span>
                </h3>
                <p className="text-lightgray-300 text-lg font-light leading-relaxed mb-8">
                  Specializing in complex, high-performance LUA scripting for FiveM. I build deep systems that don't just work—they provide a foundation for stories.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["QBCore Framework", "ESX Framework", "Custom LUA", "NUI Development"].map((tech) => (
                    <div key={tech} className="px-4 py-1.5 bg-navy-900/50 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-lightgray-400 flex items-center gap-2 group-hover:border-coral-400/30 transition-colors">
                      <div className="w-1 h-1 rounded-full bg-coral-400 shadow-[0_0_8px_rgba(247,155,114,0.8)]"></div>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Feature Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Code Showcase Side */}
          <div className="lg:col-span-5">
            <ProCodeSnippet />
          </div>
        </div>
      </div>
    </section>
  )
}
