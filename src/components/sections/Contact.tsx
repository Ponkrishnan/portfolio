'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Mail, Phone, MapPin, Github, Linkedin,
  Code2, Loader2, Send, CheckCircle, AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import SectionHeading from '@/components/ui/SectionHeading'
import { personalInfo, socialLinks } from '@/lib/data'
import type { ContactFormData } from '@/types'
import { cn } from '@/lib/utils'

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''

const contactDetails = [
  { icon: Mail,   label: 'Email',    value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
  { icon: Phone,  label: 'Phone',    value: personalInfo.phone,    href: `tel:${personalInfo.phone}` },
  { icon: MapPin, label: 'Location', value: personalInfo.location, href: '#' },
]

const socials = [
  { icon: Github,   label: 'GitHub',   href: socialLinks.github },
  { icon: Linkedin, label: 'LinkedIn', href: socialLinks.linkedin },
  { icon: Code2,    label: 'LeetCode', href: socialLinks.leetcode },
  { icon: Mail,     label: 'Email',    href: socialLinks.email },
]

const initialForm: ContactFormData = { name: '', email: '', subject: '', message: '' }

function validate(data: ContactFormData): Partial<ContactFormData> {
  const e: Partial<ContactFormData> = {}
  if (!data.name.trim()) e.name = 'Name is required'
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
  if (!data.subject.trim()) e.subject = 'Subject is required'
  if (data.message.trim().length < 10) e.message = 'At least 10 characters'
  return e
}

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const reduced = useReducedMotion()

  const update = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Portfolio] ${form.subject}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: false,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        setForm(initialForm)
        toast.success("Message sent! I'll get back to you soon.", {
          icon: <CheckCircle className="h-4 w-4 text-emerald-400" />,
        })
        setTimeout(() => setSent(false), 5000)
      } else {
        throw new Error(data.message ?? 'Submission failed')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      toast.error(`Couldn't send — ${msg}`, {
        icon: <AlertCircle className="h-4 w-4 text-red-400" />,
        description: `Email directly: ${personalInfo.email}`,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-container">
      <SectionHeading
        label="Get In Touch"
        title="Let's"
        highlight="Connect"
        subtitle="Have a project in mind or want to discuss opportunities? I'm always open to a conversation."
      />

      <div className="grid gap-12 lg:grid-cols-2">

        {/* ── Left column ── */}
        <motion.div
          initial={{ opacity: 0, x: reduced ? 0 : -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Contact details */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-primary">Contact Details</h3>
            <div className="space-y-3">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-4
                             transition-all duration-200 hover:border-white/15 hover:bg-white/[0.06] group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-blue/10">
                    <Icon className="h-5 w-5 text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-medium text-primary group-hover:text-accent-blue transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-primary">Find Me Online</h3>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={reduced ? {} : { scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5
                             text-muted transition-all duration-200 hover:border-accent-blue/50 hover:text-accent-blue
                             hover:shadow-[0_0_16px_rgba(0,180,216,0.3)]"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Status card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-accent-blue/5 via-accent-purple/5 to-transparent p-5">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-blue/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-accent-purple/10 blur-2xl" />
            <div className="relative flex items-start gap-3">
              <div className="relative mt-1 flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Open to New Roles</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Actively seeking{' '}
                  <span className="font-medium text-accent-blue">full-time Software / AI Engineering</span>{' '}
                  roles. Graduating 2026 · Immediate joinee.
                </p>
              </div>
            </div>
            <div className="relative mt-4 flex flex-wrap gap-2">
              {['Backend Engineering', 'AI / ML Systems', 'Product Engineering'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right column: form ── */}
        <motion.div
          initial={{ opacity: 0, x: reduced ? 0 : 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="glass-card space-y-5 p-6 md:p-8" noValidate>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary">Send a Message</h3>
              {sent && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-emerald-400"
                >
                  <CheckCircle className="h-3.5 w-3.5" /> Sent!
                </motion.span>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={update('name')}
                  aria-label="Name"
                  className={cn(errors.name && 'border-red-500/50')}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={update('email')}
                  aria-label="Email"
                  className={cn(errors.email && 'border-red-500/50')}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div>
              <Input
                placeholder="Subject"
                value={form.subject}
                onChange={update('subject')}
                aria-label="Subject"
                className={cn(errors.subject && 'border-red-500/50')}
              />
              {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
            </div>

            <div>
              <Textarea
                placeholder="Tell me about your project or opportunity..."
                value={form.message}
                onChange={update('message')}
                rows={5}
                aria-label="Message"
                className={cn(errors.message && 'border-red-500/50')}
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading || sent}
              className="w-full"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
              ) : sent ? (
                <><CheckCircle className="h-4 w-4" /> Message Sent!</>
              ) : (
                <><Send className="h-4 w-4" /> Send Message</>
              )}
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <p className="mt-8 text-center text-sm text-muted">
          Designed &amp; Built by{' '}
          <span className="font-semibold gradient-text">Ponkrishnan P</span>
          {' · '}2026
        </p>
      </div>
    </section>
  )
}
