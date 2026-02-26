"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Check if user is an admin
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("*")
          .eq("id", data.user.id)
          .single()

        if (adminError || !adminData) {
          await supabase.auth.signOut()
          throw new Error("Unauthorized: You are not an admin")
        }

        // Update last login
        // @ts-expect-error - Supabase type inference issue with admin_users table
        await supabase.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", data.user.id)

        router.push("/admin/dashboard")
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-700 relative overflow-hidden p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-coral-400/10 via-navy-700 to-navy-800 z-0" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-login" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-login)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-coral-400 to-transparent opacity-50" />

          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-navy-800 flex items-center justify-center border border-coral-400/20 mb-4 shadow-lg shadow-coral-400/5"
            >
              <ShieldCheck className="w-8 h-8 text-coral-400" />
            </motion.div>
            <h1 className="text-3xl font-bold text-lightgray-100 mb-2 tracking-tight">Admin Access</h1>
            <p className="text-lightgray-300 text-center text-sm">
              Secure gateway for portfolio management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lightgray-300 ml-1">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-lightgray-300 group-focus-within:text-coral-400 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 bg-navy-800/50 border-navy-600 text-lightgray-100 placeholder:text-lightgray-300/30 focus:border-coral-400/50 focus:ring-coral-400/20 transition-all rounded-xl h-12"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" translate="no" className="text-lightgray-300 ml-1">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-lightgray-300 group-focus-within:text-coral-400 transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 bg-navy-800/50 border-navy-600 text-lightgray-100 placeholder:text-lightgray-300/30 focus:border-coral-400/50 focus:ring-coral-400/20 transition-all rounded-xl h-12"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 text-sm text-coral-400 bg-coral-400/10 border border-coral-400/20 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full bg-coral-400 hover:bg-coral-500 text-navy-700 font-bold py-6 rounded-xl transition-all shadow-lg shadow-coral-400/10 hover:shadow-coral-400/20 flex items-center justify-center gap-2 group"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-navy-700/30 border-t-navy-700 rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-navy-600/50 text-center">
            <p className="text-xs text-lightgray-300/50 uppercase tracking-widest font-mono">
              Authorized Personnel Only
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

