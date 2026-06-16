'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string
  highlight?: string
  subtitle?: string
  center?: boolean
  className?: string
}

export default function SectionHeading({
  label,
  title,
  highlight,
  subtitle,
  center = true,
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <div
      ref={ref}
      className={cn('mb-16', center && 'text-center', className)}
    >
      {label && (
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue"
        >
          {label}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl font-bold text-primary md:text-4xl lg:text-5xl"
      >
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </motion.h2>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className={cn(
          'mt-4 h-[2px] rounded-full bg-gradient-to-r from-accent-blue to-accent-purple',
          center ? 'mx-auto w-24' : 'w-24'
        )}
        style={{ transformOrigin: center ? 'center' : 'left' }}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 max-w-2xl text-base text-muted md:text-lg"
          style={center ? { marginInline: 'auto' } : {}}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
