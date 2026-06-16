'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import BentoGrid from '@/components/ui/BentoGrid'

export default function About() {
  return (
    <section id="about" className="section-container">
      <SectionHeading
        label="About Me"
        title="Who I"
        highlight="Am"
        subtitle="A BTech student obsessed with building systems that scale — from microservices to LLM pipelines."
      />
      <BentoGrid />
    </section>
  )
}
