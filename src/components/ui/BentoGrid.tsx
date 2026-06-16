'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { MapPin, Briefcase, Trophy, Code2, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import { personalInfo } from '@/lib/data'
import { cn } from '@/lib/utils'

function AnimatedCounter({
  target,
  decimals = 0,
  suffix = '',
  prefix = '',
}: {
  target: number
  decimals?: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2200
    const start = performance.now()
    const frame = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((target * eased).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [isInView, target, decimals])

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}
    </span>
  )
}

interface BentoCellProps {
  className?: string
  children: React.ReactNode
  delay?: number
}

function BentoCell({ className, children, delay = 0 }: BentoCellProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      whileHover={reduced ? {} : { scale: 1.015 }}
      className={cn(
        'glass-card p-5 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,180,216,0.08)]',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// ── Profile photo with graceful fallback ──────────────────────────────────
function ProfilePhoto() {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const onLoad  = useCallback(() => setStatus('loaded'), [])
  const onError = useCallback(() => setStatus('error'),  [])

  return (
    <div className="relative mx-auto md:mx-0 h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10
                    shadow-[0_0_30px_rgba(123,47,247,0.2)]">
      {/* Gradient fallback — always rendered, hidden once photo loads */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-blue/20 to-accent-purple/30 text-4xl font-bold text-white/50 transition-opacity duration-500',
          status === 'loaded' ? 'opacity-0' : 'opacity-100'
        )}
      >
        PK
      </div>

      {/* Actual photo — face positioned at center-top of crop */}
      {status !== 'error' && (
        <Image
          src="/profile.jpg"
          alt="Ponkrishnan P"
          fill
          priority
          className={cn(
            'object-cover transition-opacity duration-500',
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            objectPosition: 'center 28%',
            transform: 'scale(1.55)',
            transformOrigin: 'center 32%',
          }}
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </div>
  )
}

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

      {/* Bio + Photo — spans 2 col × 2 row */}
      <BentoCell
        delay={0}
        className="col-span-2 row-span-2 flex flex-col gap-4 md:col-span-2"
      >
        <ProfilePhoto />
        <div>
          <h3 className="text-xl font-bold text-primary">Ponkrishnan P</h3>
          <p className="mt-1 text-sm font-medium text-accent-blue">AI & Data Science Engineer</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {personalInfo.bio}
          </p>
        </div>
      </BentoCell>

      {/* Currently at DarwinBox */}
      <BentoCell delay={0.1} className="flex flex-col justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/10">
            <Briefcase className="h-4 w-4 text-accent-blue" />
          </div>
          <span className="text-xs font-medium text-muted uppercase tracking-wider">Current</span>
        </div>
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple text-white text-sm font-bold mb-2">
            DB
          </div>
          <p className="text-sm font-semibold text-primary">DarwinBox</p>
          <p className="text-xs text-muted">Product Dev Intern</p>
          <p className="text-xs text-accent-blue mt-1">Jan – Apr 2026</p>
        </div>
      </BentoCell>

      {/* CGPA */}
      <BentoCell delay={0.15} className="flex flex-col justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-purple/10">
            <GraduationCap className="h-4 w-4 text-accent-purple" />
          </div>
          <span className="text-xs font-medium text-muted uppercase tracking-wider">CGPA</span>
        </div>
        <div>
          <p className="text-4xl font-bold gradient-text tabular-nums">
            <AnimatedCounter target={7.5} decimals={1} />
          </p>
          <p className="text-xs text-muted mt-1">Anna University</p>
          <p className="text-xs text-emerald-400 mt-0.5">No Active Backlogs ✓</p>
        </div>
      </BentoCell>

      {/* LeetCode counter */}
      <BentoCell delay={0.2} className="flex flex-col justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
            <Code2 className="h-4 w-4 text-amber-400" />
          </div>
          <span className="text-xs font-medium text-muted uppercase tracking-wider">LeetCode</span>
        </div>
        <div>
          <p className="text-4xl font-bold text-amber-400 tabular-nums">
            <AnimatedCounter target={450} suffix="+" />
          </p>
          <p className="text-xs text-muted mt-1">Problems Solved</p>
        </div>
      </BentoCell>

      {/* Projects */}
      <BentoCell delay={0.25} className="flex flex-col justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <Trophy className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="text-xs font-medium text-muted uppercase tracking-wider">Projects</span>
        </div>
        <div>
          <p className="text-4xl font-bold text-emerald-400 tabular-nums">
            <AnimatedCounter target={4} suffix="+" />
          </p>
          <p className="text-xs text-muted mt-1">Production-ready</p>
        </div>
      </BentoCell>

      {/* Location */}
      <BentoCell delay={0.3} className="flex items-center gap-3 col-span-2 md:col-span-1">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10">
          <MapPin className="h-5 w-5 text-rose-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">Coimbatore, India</p>
          <p className="text-xs text-muted">Tamil Nadu 📍</p>
          <p className="text-xs text-accent-blue mt-0.5">Open to Relocate</p>
        </div>
      </BentoCell>

    </div>
  )
}
