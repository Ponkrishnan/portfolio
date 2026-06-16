'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkillBadgeProps {
  label: string
  index?: number
  variant?: 'blue' | 'purple' | 'green' | 'default'
}

const variantStyles = {
  blue: 'border-accent-blue/20 bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 hover:shadow-[0_0_16px_rgba(0,180,216,0.35)]',
  purple: 'border-accent-purple/20 bg-accent-purple/10 text-accent-purple hover:bg-accent-purple/20 hover:shadow-[0_0_16px_rgba(123,47,247,0.35)]',
  green: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:shadow-[0_0_16px_rgba(16,185,129,0.35)]',
  default: 'border-white/10 bg-white/5 text-muted hover:bg-white/10 hover:text-primary',
}

export default function SkillBadge({ label, index = 0, variant = 'default' }: SkillBadgeProps) {
  const reduced = useReducedMotion()

  return (
    <motion.span
      initial={{ opacity: 0, scale: reduced ? 1 : 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={reduced ? {} : { scale: 1.08 }}
      className={cn(
        'inline-flex cursor-default items-center rounded-full border px-3 py-1.5 text-xs font-medium',
        'transition-all duration-200 select-none',
        variantStyles[variant]
      )}
    >
      {label}
    </motion.span>
  )
}
