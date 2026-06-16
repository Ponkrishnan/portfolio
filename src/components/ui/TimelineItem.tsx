'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { WorkExperience, Education } from '@/types'
import { cn } from '@/lib/utils'

type TimelineItemProps = (WorkExperience | Education) & { side?: 'left' | 'right' }

export default function TimelineItem(entry: TimelineItemProps) {
  const reduced = useReducedMotion()
  const side = entry.side ?? 'left'

  if (entry.type === 'work') {
    const exp = entry as WorkExperience & { side?: 'left' | 'right' }
    return (
      <motion.div
        initial={{ opacity: 0, x: reduced ? 0 : (side === 'left' ? -40 : 40) }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="glass-card p-6 hover:shadow-[0_0_30px_rgba(0,180,216,0.08)] transition-shadow duration-300"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple text-white text-sm font-bold">
            {exp.logoPlaceholder}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="text-base font-bold text-primary">{exp.company}</h3>
              <Badge variant="blue" className="text-xs">{exp.role}</Badge>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-muted mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {exp.duration}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {exp.location}
              </span>
            </div>
            <ul className="space-y-2">
              {exp.points.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.techTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-accent-blue/20 bg-accent-blue/10 px-2.5 py-0.5 text-xs text-accent-blue"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const edu = entry as Education & { side?: 'left' | 'right' }
  return (
    <motion.div
      initial={{ opacity: 0, x: reduced ? 0 : (side === 'left' ? -40 : 40) }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-card p-6 hover:shadow-[0_0_30px_rgba(123,47,247,0.08)] transition-shadow duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple to-pink-500 text-white text-sm font-bold">
          {edu.logoPlaceholder}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <h3 className="text-base font-bold text-primary">{edu.institution}</h3>
            <Badge variant="purple" className="text-xs">Education</Badge>
          </div>
          <p className="text-sm font-medium text-accent-purple mb-1">{edu.degree}</p>
          <div className="flex flex-wrap gap-3 text-xs text-muted mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {edu.duration}
            </span>
            <span className="font-semibold text-emerald-400">CGPA: {edu.cgpa}</span>
          </div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">Coursework</p>
          <div className="flex flex-wrap gap-1.5">
            {edu.coursework.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
