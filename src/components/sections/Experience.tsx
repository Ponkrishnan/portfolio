'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import TimelineItem from '@/components/ui/TimelineItem'
import { timelineEntries } from '@/lib/data'

export default function Experience() {
  const reduced = useReducedMotion()

  return (
    <section id="experience" className="section-container">
      <SectionHeading
        label="Journey"
        title="Experience &"
        highlight="Education"
        subtitle="From university halls to production codebases — the story so far."
      />

      <div className="relative">
        {/* Center line (desktop) / Left line (mobile) */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-purple/50 to-transparent
                     md:left-1/2 md:-translate-x-px"
        />

        <div className="space-y-10">
          {timelineEntries.map((entry, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={i} className="relative pl-12 md:pl-0 md:flex md:gap-8">
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: reduced ? 1 : 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute left-[9px] top-6 z-10 h-5 w-5 rounded-full border-2 border-accent-blue bg-background
                             shadow-[0_0_12px_rgba(0,180,216,0.5)]
                             md:left-1/2 md:-translate-x-1/2"
                />

                {/* Left spacer (desktop even items) */}
                {isLeft ? (
                  <>
                    <div className="hidden md:block md:w-[calc(50%-2rem)]">
                      <TimelineItem {...entry} side="left" />
                    </div>
                    <div className="hidden md:block md:w-16" />
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                    <div className="hidden md:block md:w-16" />
                    <div className="hidden md:block md:w-[calc(50%-2rem)]">
                      <TimelineItem {...entry} side="right" />
                    </div>
                  </>
                )}

                {/* Mobile: always full width */}
                <div className="md:hidden w-full">
                  <TimelineItem {...entry} side="left" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
