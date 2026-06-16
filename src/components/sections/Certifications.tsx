'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Award, Cloud, Code2, Cpu, type LucideIcon } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { certifications } from '@/lib/data'
import { cn } from '@/lib/utils'

const categoryIcons: Record<string, LucideIcon> = {
  Cloud: Cloud,
  Programming: Code2,
  DSA: Cpu,
  default: Award,
}

const categoryColors: Record<string, string> = {
  Cloud: 'from-amber-500/20 to-orange-500/20 border-amber-500/20',
  Programming: 'from-blue-500/20 to-cyan-500/20 border-blue-500/20',
  DSA: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/20',
  default: 'from-purple-500/20 to-pink-500/20 border-purple-500/20',
}

const iconColors: Record<string, string> = {
  Cloud: 'text-amber-400',
  Programming: 'text-accent-blue',
  DSA: 'text-emerald-400',
  default: 'text-accent-purple',
}

export default function Certifications() {
  const reduced = useReducedMotion()

  return (
    <section id="certifications" className="section-container">
      <SectionHeading
        label="Credentials"
        title="Certifications &"
        highlight="Achievements"
        subtitle="Verified credentials and continuous learning milestones."
      />

      {/* Certification cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => {
          const Icon = categoryIcons[cert.category] ?? categoryIcons.default
          const colorClass = categoryColors[cert.category] ?? categoryColors.default
          const iconColor = iconColors[cert.category] ?? iconColors.default

          return (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={reduced ? {} : { y: -6, scale: 1.02 }}
              className={cn(
                'group glass-card flex flex-col gap-4 p-5 bg-gradient-to-br',
                colorClass,
                'transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]'
              )}
            >
              <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-white/10', iconColor)}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-primary leading-snug">{cert.name}</h3>
                <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-accent-blue group-hover:underline">
                Verify Credential
                <ExternalLink className="h-3 w-3" />
              </div>
            </motion.a>
          )
        })}
      </div>

      {/* LeetCode achievement banner */}
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 flex items-center justify-center gap-4 rounded-2xl border border-amber-500/20
                   bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10
                   px-6 py-5 animate-pulse-glow"
      >
        <Code2 className="h-8 w-8 text-amber-400 shrink-0" />
        <div className="text-center">
          <p className="text-2xl font-black text-amber-400">450+ Problems Solved</p>
          <p className="text-sm text-muted">LeetCode — Data Structures & Algorithms</p>
        </div>
        <a
          href="https://leetcode.com/Ponkrishnan"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors shrink-0"
        >
          View Profile →
        </a>
      </motion.div>

    </section>
  )
}
