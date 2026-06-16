export type ProjectCategory = 'AI/LLM' | 'Computer Vision' | 'Backend'

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  category: ProjectCategory
  points: string[]
  githubUrl: string
  liveUrl?: string
  gradient: string
  accentColor: string
}

export interface SkillBar {
  name: string
  percentage: number
}

export interface SkillCategory {
  label: string
  skills: string[]
}

export interface WorkExperience {
  type: 'work'
  company: string
  role: string
  location: string
  duration: string
  points: string[]
  techTags: string[]
  logoPlaceholder: string
}

export interface Education {
  type: 'education'
  institution: string
  degree: string
  duration: string
  cgpa: string
  coursework: string[]
  logoPlaceholder: string
}

export type TimelineEntry = WorkExperience | Education

export interface Certification {
  id: string
  name: string
  issuer: string
  link: string
  category: string
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
