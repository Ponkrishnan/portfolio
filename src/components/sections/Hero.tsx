'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, Code2, Download, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { personalInfo, roleTitles, socialLinks } from '@/lib/data'

const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-2 border-accent-blue/20 border-t-accent-blue" />
    </div>
  ),
})

// ── Typewriter ──────────────────────────────────────────────────────────────
function TypewriterText({ texts }: { texts: string[] }) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx]         = useState(0)
  const [deleting, setDeleting] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) { setDisplay(texts[0]); return }
    const current = texts[idx]
    const speed   = deleting ? 40 : 85
    const id = setTimeout(() => {
      if (!deleting && display.length < current.length) {
        setDisplay(current.slice(0, display.length + 1))
      } else if (!deleting) {
        setTimeout(() => setDeleting(true), 2000)
      } else if (display.length > 0) {
        setDisplay(display.slice(0, -1))
      } else {
        setDeleting(false)
        setIdx((p) => (p + 1) % texts.length)
      }
    }, speed)
    return () => clearTimeout(id)
  }, [display, deleting, idx, texts, reduced])

  return (
    <span className="inline-flex items-baseline">
      <span className="gradient-text font-semibold">{display}</span>
      <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[1px] animate-pulse bg-accent-blue" />
    </span>
  )
}

// ── Innovative scroll indicator ────────────────────────────────────────────
function ScrollIndicator({ onClick }: { onClick: () => void }) {
  const reduced = useReducedMotion()
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={onClick}
      aria-label="Scroll to About"
      className="group flex flex-col items-center gap-2"
    >
      {/* Mouse outline */}
      <div className="relative flex h-10 w-6 items-start justify-center overflow-hidden rounded-full border border-white/25 pt-1.5
                      transition-colors duration-300 group-hover:border-accent-blue/60">
        {/* Gradient glow ring */}
        <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{ boxShadow: '0 0 12px rgba(0,180,216,0.4) inset' }} />
        {/* Scroll dot */}
        <motion.div
          animate={reduced ? {} : {
            y:       [0, 16, 0],
            opacity: [1, 0,  1],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-1.5 w-1 rounded-full bg-gradient-to-b from-accent-blue to-accent-purple"
        />
      </div>

      {/* Cascading chevron dots */}
      <div className="flex flex-col items-center gap-[3px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { opacity: [0.08, 0.55, 0.08] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.28, ease: 'easeInOut' }}
            className="h-[3px] w-[3px] rounded-full bg-white/60"
          />
        ))}
      </div>

      {/* Label */}
      <motion.span
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-[9px] font-medium uppercase tracking-[0.3em] text-muted/60
                   group-hover:text-accent-blue/80 transition-colors duration-300"
      >
        Explore
      </motion.span>
    </motion.button>
  )
}

// ── Social links ───────────────────────────────────────────────────────────
const socialIcons = [
  { icon: Github,   href: socialLinks.github,   label: 'GitHub'   },
  { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
  { icon: Code2,    href: socialLinks.leetcode, label: 'LeetCode' },
  { icon: Mail,     href: socialLinks.email,    label: 'Email'    },
]

// ── Hero ───────────────────────────────────────────────────────────────────
export default function Hero() {
  const reduced   = useReducedMotion()
  const { scrollY } = useScroll()

  // Parallax — canvas drifts up + fades as user scrolls away
  const rawY    = useTransform(scrollY, [0, 600], [0, -80])
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 })

  // Text drifts up slightly slower
  const textY      = useTransform(scrollY, [0, 600], [0, -40])
  const springTY   = useSpring(textY,      { stiffness: 80, damping: 20 })

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }
  const item = {
    hidden:  { opacity: 0, y: reduced ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  }

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden">

      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-[600px] w-[600px] rounded-full bg-accent-blue/4 blur-[120px]" />
        <div className="absolute -right-40 bottom-1/3 h-[600px] w-[600px] rounded-full bg-accent-purple/4 blur-[120px]" />
      </div>

      <div className="section-container relative z-10 flex w-full flex-col items-center gap-8 lg:flex-row">

        {/* ── Left: text ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          style={{ y: springTY }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Greeting tag */}
          <motion.div variants={item} className="mb-4 inline-flex items-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent-blue" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">
              Hi, I&apos;m
            </span>
            <span className="h-px w-8 bg-gradient-to-r from-accent-blue to-transparent" />
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-[5.5rem]"
          >
            <span className="gradient-text-animated">PONKRISHNAN</span>
            <br />
            <span className="text-primary/90">P</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={item}
            className="mt-5 min-h-[1.8rem] text-lg sm:text-xl"
          >
            <TypewriterText texts={roleTitles} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted lg:text-lg"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <Button variant="primary" size="lg" onClick={() => scrollTo('projects')} className="group">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const link = document.createElement('a')
                link.href = personalInfo.resumeUrl
                link.download = 'Ponkrishnan_Resume.pdf'
                link.click()
              }}
              className="group"
            >
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={item}
            className="mt-8 flex justify-center gap-3 lg:justify-start"
          >
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={reduced ? {} : { scale: 1.18, y: -3 }}
                whileTap={{ scale: 0.93 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5
                           text-muted transition-all duration-200
                           hover:border-accent-blue/50 hover:text-accent-blue
                           hover:shadow-[0_0_16px_rgba(0,180,216,0.3)]"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>

          {/* Quick stats strip */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap justify-center gap-6 lg:justify-start"
          >
            {[
              { value: '450+', label: 'LeetCode' },
              { value: '3+',   label: 'Projects'  },
              { value: '4mo',  label: 'DarwinBox'  },
            ].map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p className="text-xl font-black gradient-text">{value}</p>
                <p className="text-xs text-muted">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: 3D canvas ── */}
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
          style={{ y: springY }}
          className="h-[380px] w-full flex-1 lg:h-[540px]"
        >
          <HeroCanvas />
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator onClick={() => scrollTo('about')} />
      </div>
    </section>
  )
}
