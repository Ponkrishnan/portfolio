'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index: number
}

const categoryColors: Record<string, string> = {
  'AI/LLM': 'from-cyan-500 to-blue-500',
  'Computer Vision': 'from-emerald-500 to-teal-500',
  'Backend': 'from-purple-500 to-violet-500',
}

const categoryBadgeVariant: Record<string, 'blue' | 'green' | 'purple'> = {
  'AI/LLM': 'blue',
  'Computer Vision': 'green',
  'Backend': 'purple',
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={reduced ? {} : { scale: 1.015, y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-md
                 transition-shadow duration-300 hover:border-white/15 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)]"
    >
      {/* Category gradient bar */}
      <div className={cn('h-1 w-full bg-gradient-to-r', categoryColors[project.category] ?? 'from-accent-blue to-accent-purple')} />

      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-primary group-hover:gradient-text transition-all duration-300">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted leading-relaxed">{project.description}</p>
          </div>
          <Badge variant={categoryBadgeVariant[project.category] ?? 'blue'} className="shrink-0 text-xs">
            {project.category}
          </Badge>
        </div>

        {/* Bullet points (collapsible on mobile) */}
        <div>
          <motion.ul
            className={cn(
              'space-y-1.5 overflow-hidden md:block',
              !expanded && 'hidden'
            )}
            animate={{ height: 'auto' }}
          >
            {project.points.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                {point}
              </li>
            ))}
          </motion.ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 flex items-center gap-1 text-xs text-accent-blue hover:text-accent-blue/80 transition-colors md:hidden"
          >
            {expanded ? (
              <><ChevronUp className="h-3 w-3" /> Show less</>
            ) : (
              <><ChevronDown className="h-3 w-3" /> Show details</>
            )}
          </button>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: reduced ? 1 : 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-muted"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            Source Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-accent-blue hover:text-accent-blue/80 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
