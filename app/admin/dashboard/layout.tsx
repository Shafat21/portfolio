"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquareQuote,
  GraduationCap,
  Briefcase,
  Code2,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  User,
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState<string>("")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email || "")
      }
    }
    getUser()

    // Auto-close sidebar on mobile
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/admin/dashboard/projects",
      icon: FolderKanban,
    },
    {
      name: "Testimonials",
      href: "/admin/dashboard/testimonials",
      icon: MessageSquareQuote,
    },
    {
      name: "Education",
      href: "/admin/dashboard/education",
      icon: GraduationCap,
    },
    {
      name: "Experience",
      href: "/admin/dashboard/experience",
      icon: Briefcase,
    },
    {
      name: "Skills",
      href: "/admin/dashboard/skills",
      icon: Code2,
    },
  ]

  return (
    <div className="min-h-screen bg-navy-700 text-lightgray-100 font-sans selection:bg-coral-400/30 selection:text-coral-400">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-coral-400/5 via-navy-700 to-navy-800 -z-10" />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="h-full m-4 glass-card shadow-2xl rounded-2xl border border-coral-400/10 flex flex-col overflow-hidden">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-navy-600/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coral-400 flex items-center justify-center shadow-lg shadow-coral-400/20">
                <ShieldCheck className="w-6 h-6 text-navy-700" />
              </div>
              <span className="text-xl font-bold tracking-tight">Admin<span className="text-coral-400">Panel</span></span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-lightgray-300 hover:text-coral-400 hover:bg-navy-600/50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Profile Summary */}
          <div className="px-6 py-6 border-b border-navy-600/50 bg-navy-800/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-600 border border-coral-400/10 flex items-center justify-center">
                <User className="w-5 h-5 text-coral-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-lightgray-300/50 uppercase tracking-widest font-mono">Status: active</p>
                <p className="text-sm font-medium text-lightgray-100 truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar pt-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden ${isActive
                      ? "text-navy-700 shadow-lg shadow-coral-400/10"
                      : "text-lightgray-300 hover:text-coral-400 hover:bg-navy-600/50"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-coral-400 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 ${isActive ? "text-navy-700" : "group-hover:scale-110 transition-transform"}`} />
                  <span className="flex-1">{item.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer / Logout */}
          <div className="p-4 border-t border-navy-600/50">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-lightgray-300 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 min-h-screen flex flex-col ${sidebarOpen ? "lg:ml-72" : "ml-0"
          }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-navy-700/50 backdrop-blur-md border-b border-navy-600/50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="text-lightgray-300 hover:text-coral-400 hover:bg-navy-600/50"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}
              <h2 className="text-lg font-semibold text-lightgray-100 lg:hidden">
                Admin Panel
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/" target="_blank">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-navy-600 text-lightgray-300 hover:text-coral-400 hover:bg-navy-600/50 rounded-xl gap-2 h-10 px-4"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Live Site</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
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

