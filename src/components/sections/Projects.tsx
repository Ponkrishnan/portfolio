'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/lib/data'
import type { ProjectCategory } from '@/types'
import { cn } from '@/lib/utils'

type FilterOption = 'All' | ProjectCategory

const filters: FilterOption[] = ['All', 'AI/LLM', 'Computer Vision', 'Backend']

export default function Projects() {
  const [active, setActive] = useState<FilterOption>('All')
  const reduced = useReducedMotion()

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="section-container">
      <SectionHeading
        label="Work"
        title="Featured"
        highlight="Projects"
        subtitle="Production-grade systems spanning AI, computer vision, and scalable backend engineering."
      />

      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={cn(
              'relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200',
              active === f ? 'text-white' : 'text-muted hover:text-primary'
            )}
          >
            {active === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                transition={{ type: 'spring', stiffness: 420, damping: 38 }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>

      {/* Project grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -12 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">No projects in this category yet.</p>
      )}
    </section>
  )
}
