'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/data'

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('')
  const prevScrollY = useRef(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current < 80) {
        setIsVisible(true)
      } else {
        setIsVisible(prevScrollY.current > current)
      }
      prevScrollY.current = current
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.45 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleClick = (href: string) => {
    const el = document.getElementById(href.slice(1))
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: reduced ? 0 : -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduced ? 0 : -80, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-background/80 px-3 py-2 shadow-xl backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200',
                    isActive ? 'text-white' : 'text-muted hover:text-primary'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}

            <div className="mx-1 h-5 w-px bg-white/10" />

            <a
              href="mailto:ponkrishnan4@gmail.com"
              className={cn(
                'relative rounded-full px-4 py-1.5 text-xs font-semibold text-white',
                'bg-gradient-to-r from-accent-blue to-accent-purple',
                'hover:shadow-[0_0_16px_rgba(0,180,216,0.5)] transition-shadow duration-300'
              )}
            >
              Hire Me
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
