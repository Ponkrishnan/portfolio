'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, restDelta: 0.001 })

  return (
    <>
      {/* Top gradient progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #00b4d8, #7b2ff7)',
        }}
      />

      {/* Vertical section dots — right side */}
      <SectionDots />
    </>
  )
}

const SECTIONS = ['about', 'skills', 'projects', 'experience', 'certifications', 'contact']

function SectionDots() {
  const activeRef = useRef<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const dots = document.querySelectorAll('[data-dot]')

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeRef.current = id
            dots.forEach((d) => {
              const isActive = (d as HTMLElement).dataset.dot === id
              d.setAttribute('data-active', String(isActive))
            })
          }
        },
        { threshold: 0.45 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      {SECTIONS.map((id) => (
        <button
          key={id}
          data-dot={id}
          onClick={() => scrollTo(id)}
          aria-label={`Go to ${id}`}
          className="group relative flex h-5 w-5 items-center justify-center"
        >
          {/* Default dot */}
          <span
            className="block h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300
                       group-hover:bg-accent-blue/70
                       data-[active=true]:bg-accent-blue data-[active=true]:shadow-[0_0_6px_rgba(0,180,216,0.8)]"
          />
          {/* Tooltip label */}
          <span
            className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-white/8
                       bg-background/90 px-2 py-1 text-xs text-muted opacity-0 backdrop-blur-sm
                       transition-opacity duration-200 group-hover:opacity-100 capitalize"
          >
            {id}
          </span>
        </button>
      ))}
    </div>
  )
}
