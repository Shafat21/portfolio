"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { GitlabIcon as GitHub, Linkedin, Mail, Cloud } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

import { smoothScrollTo } from "@/utils/smoothScroll"

// Enhanced typing animation component with wrapping and cursor support
const TypingAnimation = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 30) // Faster, snappier typing

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [text, delay])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="relative inline">
      {displayedText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        className="inline-block w-2 h-5 bg-coral-400 ml-1 align-middle"
        style={{ height: '1.2em' }}
      />
    </span>
  )
}

// Improved code editor animation
const CodeEditorAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false }) // Optimization: alpha false
    if (!ctx) return

    // Pre-calculated layout variables
    let layout = {
      scaleFactor: 1,
      lineHeight: 16,
      startX: 40,
      startY: 30,
      tabSize: 20,
      fontSize: 12
    }

    const colors = {
      background: "#2A4759",
      text: "#EEEEEE",
      comment: "#DDDDDD",
      keyword: "#F79B72",
      string: "#F79B72",
      function: "#DDDDDD",
      variable: "#F79B72",
      cursor: "#EEEEEE",
    }

    const codeLines = [
      { text: "// Web Developer Portfolio", color: colors.comment },
      { text: "import React from 'react';", color: colors.keyword },
      { text: "import { motion } from 'framer-motion';", color: colors.keyword },
      { text: "", color: colors.text },
      { text: "function Portfolio() {", color: colors.function },
      { text: "  const [projects, setProjects] = useState([]);", color: colors.variable },
      { text: "", color: colors.text },
      { text: "  useEffect(() => {", color: colors.function },
      { text: "    // Fetch projects data", color: colors.comment },
      { text: "    fetchProjects().then(data => {", color: colors.function },
      { text: "      setProjects(data);", color: colors.variable },
      { text: "    });", color: colors.text },
      { text: "  }, []);", color: colors.text },
      { text: "", color: colors.text },
      { text: "  return (", color: colors.keyword },
      { text: '    <div className="portfolio">', color: colors.text },
      { text: '      <Header title="Shafat Alam" />', color: colors.function },
      { text: "      <Hero />", color: colors.function },
      { text: "      <Projects data={projects} />", color: colors.function },
      { text: "      <Contact />", color: colors.function },
      { text: "    </div>", color: colors.text },
      { text: "  );", color: colors.text },
      { text: "}", color: colors.function },
      { text: "", color: colors.text },
      { text: "export default Portfolio;", color: colors.keyword },
    ]

    let state = {
      currentLine: 0,
      currentChar: 0,
      cursorVisible: true,
      lastBlink: 0,
      lastType: 0
    }

    const drawEditor = () => {
      if (!ctx || !canvas) return
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      // Clear
      ctx.fillStyle = colors.background
      ctx.fillRect(0, 0, canvas.width, canvas.height) // Clear the actual pixel buffer

      ctx.save()
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      // Line numbers bg
      ctx.fillStyle = "#1e3a4a"
      ctx.fillRect(0, 0, layout.startX - 10 * layout.scaleFactor, height)

      ctx.font = `${layout.fontSize}px monospace`

      for (let i = 0; i < Math.min(state.currentLine + 1, codeLines.length); i++) {
        const line = codeLines[i]

        // Line number
        ctx.fillStyle = "#DDDDDD"
        ctx.textAlign = "right"
        ctx.fillText(`${i + 1}`, layout.startX - 15 * layout.scaleFactor, layout.startY + i * layout.lineHeight)

        ctx.textAlign = "left"
        let indentLevel = line.text.startsWith("  ") ? (line.text.match(/^\s+/)?.[0].length || 0) / 2 : 0

        if (i < state.currentLine) {
          ctx.fillStyle = line.color
          ctx.fillText(line.text, layout.startX + indentLevel * layout.tabSize, layout.startY + i * layout.lineHeight)
        } else if (i === state.currentLine) {
          const currentText = line.text.substring(0, state.currentChar)
          ctx.fillStyle = line.color
          ctx.fillText(currentText, layout.startX + indentLevel * layout.tabSize, layout.startY + i * layout.lineHeight)

          if (state.cursorVisible) {
            const cursorX = layout.startX + indentLevel * layout.tabSize + ctx.measureText(currentText).width
            ctx.fillStyle = colors.cursor
            ctx.fillRect(cursorX, layout.startY + i * layout.lineHeight - layout.lineHeight + 3 * layout.scaleFactor, 2 * layout.scaleFactor, layout.lineHeight)
          }
        }
      }
      ctx.restore()
    }

    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (container) {
        const width = Math.min(500, container.clientWidth)
        const height = Math.min(400, width * 0.8)

        canvas.width = width * window.devicePixelRatio
        canvas.height = height * window.devicePixelRatio
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        // Update layout constants once per resize
        layout.scaleFactor = width / 500
        layout.lineHeight = 16 * layout.scaleFactor
        layout.startX = 40 * layout.scaleFactor
        layout.startY = 30 * layout.scaleFactor
        layout.tabSize = 20 * layout.scaleFactor
        layout.fontSize = 12 * layout.scaleFactor

        drawEditor() // Redraw immediately on resize
      }
    }

    let animationId: number
    const frame = (time: number) => {
      if (!isAnimating) return

      let needsRedraw = false

      // Cursor blink - every 500ms
      if (time - state.lastBlink > 500) {
        state.cursorVisible = !state.cursorVisible
        state.lastBlink = time
        needsRedraw = true
      }

      // Typing - every 30-80ms for variadic feel
      if (time - state.lastType > 40) {
        if (state.currentLine < codeLines.length) {
          if (state.currentChar < codeLines[state.currentLine].text.length) {
            state.currentChar++
          } else {
            state.currentLine++
            state.currentChar = 0
          }
          state.lastType = time
          needsRedraw = true
        } else {
          // Pause at end then reset
          if (time - state.lastType > 3000) {
            state.currentLine = 0
            state.currentChar = 0
            state.lastType = time
            needsRedraw = true
          }
        }
      }

      if (needsRedraw) drawEditor()
      animationId = requestAnimationFrame(frame)
    }

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    animationId = requestAnimationFrame(frame)
    updateCanvasSize()

    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
    }
  }, [isAnimating])

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      <div className="absolute top-0 left-0 right-0 h-8 bg-navy-800 rounded-t-lg flex items-center px-4 z-10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-lightgray-300 mx-auto">portfolio.tsx</div>
      </div>
      <canvas
        ref={canvasRef}
        className="rounded-lg shadow-2xl border border-navy-600 w-full bg-[#2A4759]"
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      />
    </div>
  )
}



export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-navy-700 pt-24 pb-12"
    >
      {/* Immersive Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_var(--tw-gradient-stops))] from-coral-400/15 via-transparent to-transparent z-0 opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent z-0 opacity-40"></div>

      {/* Grid Pattern with Fade */}
      <div className="absolute inset-0 opacity-[0.03] z-0" style={{ maskImage: 'radial-gradient(circle at center, black, transparent 80%)' }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Main Content Area */}
          <div className="lg:w-3/5 text-center lg:text-left">
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
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-coral-400/90">Available for new projects</span>
            </motion.div>

            {/* Headline Hierarchy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-lightgray-300 font-mono text-lg mb-2 opacity-80">Full Stack Developer</h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
                <span className="text-lightgray-100">Crafting</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-400 to-coral-600">Digital Experiences</span>
              </h1>
            </motion.div>

            {/* Sub-headline / Typing */}
            <motion.div
              className="text-xl md:text-2xl text-lightgray-200 mb-8 max-w-2xl font-light leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              I am <span className="font-bold text-coral-400">Shafat Alam</span>, <TypingAnimation text="crafting high-performance web applications, immersive FiveM systems, and intelligent automation." delay={0.8} />
            </motion.div>

            {/* CTA Group */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-5 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <button
                onClick={() => smoothScrollTo("projects")}
                className="group relative px-8 py-4 bg-coral-400 text-navy-800 font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(247,155,114,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>

              <button
                onClick={() => smoothScrollTo("about")}
                className="px-8 py-4 bg-navy-800/50 backdrop-blur-md border border-lightgray-300/10 text-lightgray-100 font-bold rounded-xl transition-all duration-300 hover:bg-navy-800/80 hover:border-coral-400/40"
              >
                About Me
              </button>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-2 opacity-60 hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              {['Next.js', 'TypeScript', 'Node.js', 'Three.js', 'FiveM', 'Python'].map((tech) => (
                <span key={tech} className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-navy-900/50 border border-white/5 rounded-md text-lightgray-400">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Interactive Visual Area */}
          <motion.div
            className="lg:w-2/5 w-full relative group"
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            {/* Ambient Glow behind Code Editor */}
            <div className="absolute -inset-10 bg-coral-400/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0"></div>

            <div className="relative z-10">
              <CodeEditorAnimation />
            </div>

            {/* Floating Achievement Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 lg:-right-10 bg-navy-800/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl z-20 hidden md:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-coral-400/20 rounded-xl flex items-center justify-center border border-coral-400/30">
                  <Cloud className="text-coral-400 w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] text-coral-400 font-bold uppercase tracking-wider mb-1">Current Focus</div>
                  <div className="text-sm font-bold text-lightgray-100 italic">"Building Scalable Solutions"</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] font-mono text-lightgray-400 uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-gradient-to-b from-coral-400 to-transparent"
        />
      </motion.div>
    </section>
  )
}
