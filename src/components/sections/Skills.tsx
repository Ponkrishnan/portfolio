'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import SkillBadge from '@/components/ui/SkillBadge'
import { skillBars, skillCategories } from '@/lib/data'

const badgeVariants: ('blue' | 'purple' | 'green' | 'default')[] = [
  'blue', 'purple', 'green', 'blue', 'purple', 'green',
]

function SkillBar({
  name,
  percentage,
  index,
}: {
  name: string
  percentage: number
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-primary">{name}</span>
        <span className="font-semibold text-accent-blue tabular-nums">{percentage}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${percentage}%` } : { width: '0%' }}
          transition={{
            duration: reduced ? 0 : 1.4,
            delay: index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple relative"
        >
          <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(0,180,216,0.8)]" />
        </motion.div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-container">
      <SectionHeading
        label="Technical Skills"
        title="What I"
        highlight="Know"
        subtitle="A full-stack view of my technical toolkit — from backend systems to ML pipelines."
      />

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Skill bars */}
        <div>
          <h3 className="mb-8 text-lg font-bold text-primary">
            Proficiency Overview
          </h3>
          <div className="space-y-5">
            {skillBars.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Category badges */}
        <div>
          <h3 className="mb-8 text-lg font-bold text-primary">
            Full Toolkit
          </h3>
          <div className="space-y-6">
            {skillCategories.map((cat, catIdx) => (
              <div key={cat.label}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, i) => (
                    <SkillBadge
                      key={skill}
                      label={skill}
                      index={catIdx * 6 + i}
                      variant={badgeVariants[catIdx % badgeVariants.length]}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
