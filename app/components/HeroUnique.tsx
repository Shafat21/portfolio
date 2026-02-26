import React, { Suspense, lazy } from "react"
import { motion } from "framer-motion"

const Spline = lazy(() => import("@splinetool/react-spline"))
import { smoothScrollTo } from "@/utils/smoothScroll"
import { Loader2 } from "lucide-react"

const SceneLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-navy-700/50 backdrop-blur-sm z-0">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-coral-400 animate-spin" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-lightgray-400 font-bold">Initializing 3D Space</span>
        </div>
    </div>
)

export default function HeroUnique() {
    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden bg-navy-700">
            {/* Spline Container */}
            <div className="absolute inset-0 z-0">
                <Suspense fallback={<SceneLoader />}>
                    <Spline
                        scene="https://prod.spline.design/goQH3j8HiwY-NJgf/scene.splinecode"
                        className="w-full h-full"
                    />
                </Suspense>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-auto">
                <div className="container mx-auto px-6 text-center lg:text-left">
                    <div className="max-w-4xl">
                        {/* Meta Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800/40 border border-coral-400/30 backdrop-blur-md mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-coral-500"></span>
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-coral-400/90">New Visual Experience</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-6 leading-[0.8] tracking-tighter text-white mix-blend-difference">
                                SHAFAT<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-400 to-coral-600">ALAM</span>
                            </h1>
                        </motion.div>

                        {/* CTA Group */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-wrap gap-5 mt-8 justify-center lg:justify-start"
                        >
                            <button
                                onClick={() => smoothScrollTo("projects")}
                                className="group relative px-10 py-5 bg-coral-400 text-navy-800 font-black uppercase tracking-[0.2em] text-xs rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.1] active:scale-95 shadow-[0_0_30px_rgba(247,155,114,0.4)]"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Check My Work
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                            </button>

                            <button
                                onClick={() => smoothScrollTo("contact")}
                                className="px-10 py-5 bg-navy-800/50 backdrop-blur-md border border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all duration-300 hover:bg-navy-800/80 hover:border-coral-400/40"
                            >
                                Contact Me
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Decorative Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-navy-700 via-navy-700/40 to-transparent pointer-events-none z-[5]" />
        </section>
    )
}
