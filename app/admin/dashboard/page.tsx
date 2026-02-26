"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, MessageSquareQuote, GraduationCap, Briefcase, Code2, ArrowUpRight, Zap } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    testimonials: 0,
    education: 0,
    experience: 0,
    skills: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: projectsCount },
          { count: testimonialsCount },
          { count: educationCount },
          { count: experienceCount },
          { count: skillsCount },
        ] = await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase.from("testimonials").select("*", { count: "exact", head: true }),
          supabase.from("education").select("*", { count: "exact", head: true }),
          supabase.from("experience").select("*", { count: "exact", head: true }),
          supabase.from("skills").select("*", { count: "exact", head: true }),
        ])

        setStats({
          projects: projectsCount || 0,
          testimonials: testimonialsCount || 0,
          education: educationCount || 0,
          experience: experienceCount || 0,
          skills: skillsCount || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-coral-400",
      bg: "bg-coral-400/10",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquareQuote,
      color: "text-lightgray-300",
      bg: "bg-navy-600/50",
    },
    {
      title: "Education",
      value: stats.education,
      icon: GraduationCap,
      color: "text-coral-400",
      bg: "bg-coral-400/10",
    },
    {
      title: "Experience",
      value: stats.experience,
      icon: Briefcase,
      color: "text-lightgray-300",
      bg: "bg-navy-600/50",
    },
    {
      title: "Skills",
      value: stats.skills,
      icon: Code2,
      color: "text-coral-400",
      bg: "bg-coral-400/10",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-lightgray-100 tracking-tight">System <span className="text-coral-400">Overview</span></h1>
          <p className="text-lightgray-300/60 mt-2 font-medium">
            Welcome back, administrator. Here&apos;s your portfolio performance.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-navy-800/50 rounded-2xl border border-coral-400/10 backdrop-blur-sm self-start md:self-auto">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-tighter text-lightgray-300/80">System Live</span>
        </div>
      </header>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {statCards.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <div className="glass-card group hover:border-coral-400/30 transition-all duration-300 rounded-2xl p-6 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl -mr-12 -mt-12 rounded-full opacity-0 group-hover:opacity-20 transition-opacity ${stat.bg.replace('/10', '/30')}`} />

              <div className="flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-lightgray-300/50 mb-1">
                    {stat.title}
                  </p>
                  <div className="text-3xl font-bold text-lightgray-100 flex items-baseline gap-2">
                    {loading ? (
                      <div className="w-8 h-8 bg-navy-600 animate-pulse rounded" />
                    ) : (
                      stat.value
                    )}
                    <span className="text-xs font-normal text-lightgray-300/30">Total</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-card rounded-3xl p-8 h-full border border-coral-400/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-coral-400/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-coral-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-lightgray-100">Quick Operations</h3>
                <p className="text-sm text-lightgray-300/40 font-medium">Direct management links</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {statCards.map((stat) => (
                <Link
                  key={stat.title}
                  href={`/admin/dashboard/${stat.title.toLowerCase()}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-navy-800/40 border border-navy-600 hover:border-coral-400/40 hover:bg-navy-800/60 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-lightgray-100 group-hover:text-coral-400 transition-colors">
                      {stat.title}
                    </h4>
                    <p className="text-xs text-lightgray-300/40 truncate">Manage entries</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-lightgray-300/20 group-hover:text-coral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="glass-card rounded-3xl p-8 border border-navy-600/50 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck className="w-32 h-32 text-coral-400" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-lightgray-100">Portal Security</h3>
                <p className="text-sm text-lightgray-300/40 font-medium">System status and authentication</p>
              </div>

              <div className="space-y-4 flex-1">
                <div className="p-5 rounded-2xl bg-green-400/5 border border-green-400/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center text-green-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-400">Connection Secured</p>
                    <p className="text-xs text-lightgray-300/40">Using end-to-end SSL/Auth</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-coral-400/5 border border-coral-400/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-coral-400/20 flex items-center justify-center text-coral-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-coral-400">Admin Privileges</p>
                    <p className="text-xs text-lightgray-300/40">Full write/delete access active</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-navy-600/50 flex items-center justify-between">
                <span className="text-xs font-mono text-lightgray-300/30 uppercase tracking-widest">v2.1.0-dark</span>
                <span className="text-xs font-mono text-lightgray-300/30 uppercase tracking-widest">Built with Next.js</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

