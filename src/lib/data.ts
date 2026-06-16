import type {
  Project,
  SkillBar,
  SkillCategory,
  TimelineEntry,
  Certification,
  NavItem,
} from '@/types'

export const personalInfo = {
  name: 'Ponkrishnan P',
  firstName: 'Ponkrishnan',
  email: 'ponkrishnan4@gmail.com',
  phone: '+91 9894256060',
  location: 'Coimbatore, India',
  tagline:
    'Building intelligent systems at the intersection of AI and scalable backend engineering.',
  bio: "I'm Ponkrishnan, a BTech AI & Data Science student at Sri Eshwar College of Engineering, Coimbatore. I specialize in scalable RESTful APIs, LLM-powered pipelines, and real-time AI systems. I interned at DarwinBox building enterprise HR platforms with Python, FastAPI, and CI/CD. Passionate about bridging AI research and production backend engineering.",
  college: 'Sri Eshwar College of Engineering',
  degree: 'B.Tech in Artificial Intelligence and Data Science',
  cgpa: 7.5,
  leetcodeCount: 450,
  projectCount: 4,
  resumeUrl: '/assets/Ponkrishnan_Resume.pdf',
}

export const socialLinks = {
  github: 'https://github.com/Ponkrishnan',
  linkedin: 'https://www.linkedin.com/in/ponkrishnan-p-1316ab259/',
  leetcode: 'https://leetcode.com/Ponkrishnan',
  kaggle: 'https://kaggle.com/ponkrishnan',
  email: 'mailto:ponkrishnan4@gmail.com',
}

export const roleTitles: string[] = [
  'AI & Data Science Engineer',
  'Backend Developer',
  'LLM & RAG Systems Builder',
  'FastAPI + Spring Boot Developer',
  'BTech AI&DS @ Sri Eshwar',
]

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export const skillBars: SkillBar[] = [
  { name: 'Python', percentage: 90 },
  { name: 'Java', percentage: 85 },
  { name: 'FastAPI / Spring Boot', percentage: 82 },
  { name: 'Machine Learning / NLP', percentage: 80 },
  { name: 'SQL & Databases', percentage: 85 },
  { name: 'LLM & RAG Systems', percentage: 78 },
  { name: 'Docker / AWS / CI-CD', percentage: 75 },
  { name: 'DSA (LeetCode 450+)', percentage: 88 },
]

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'C++', 'SQL'],
  },
  {
    label: 'Frameworks',
    skills: ['Spring Boot', 'FastAPI', 'Node.js', 'React.js', 'REST APIs'],
  },
  {
    label: 'Testing & Tools',
    skills: ['JUnit', 'PyTest', 'Postman', 'Unit Testing', 'Git', 'GitHub'],
  },
  {
    label: 'Cloud & DevOps',
    skills: ['AWS EC2/S3', 'Docker', 'CI/CD Pipelines', 'Linux'],
  },
  {
    label: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    label: 'Core CS',
    skills: ['DSA', 'OOP', 'DBMS', 'OS', 'System Design', 'Agile'],
  },
]

export const projects: Project[] = [
  {
    id: 'autogenx',
    title: 'AutoGenX',
    description: 'AI Vehicle Diagnostic Platform — LLM + RAG-powered real-time automotive diagnostics with sub-100ms APIs.',
    techStack: ['Python', 'FastAPI', 'React.js', 'MongoDB', 'LLM', 'RAG', 'NLP'],
    category: 'AI/LLM',
    points: [
      'Built low-latency REST APIs processing real-time vehicle sensor data with sub-100ms response',
      'Integrated LLM + RAG pipelines for intelligent NLP-based automotive diagnostics',
      'Designed interactive dashboards visualizing real-time performance metrics',
      'Wrote automated tests and structured logging for production-grade reliability',
    ],
    githubUrl: 'https://github.com/Ponkrishnan',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentColor: '#00b4d8',
  },
  {
    id: 'ai-data-layer',
    title: 'AI Data Layer',
    description: 'Enterprise HR Intelligence Platform — multi-tenant backend managing HR, payroll, and recruitment at scale.',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS', 'RBAC', 'ETL'],
    category: 'Backend',
    points: [
      'Designed multi-tenant backend services managing HR, payroll, and recruitment data at scale',
      'Implemented secure REST APIs with Role-Based Access Control ensuring data isolation',
      'Built ETL pipelines and optimized database queries for performance at scale',
      'Developed KPI engines enabling automated workforce analytics and reporting',
    ],
    githubUrl: 'https://github.com/Ponkrishnan',
    gradient: 'from-purple-500/20 to-pink-500/20',
    accentColor: '#7b2ff7',
  },
  {
    id: 'driveguard',
    title: 'DriveGuard',
    description: 'AI Driver Safety Monitoring System — real-time CV pipeline detecting fatigue and unsafe driving behavior.',
    techStack: ['Python', 'OpenCV', 'MongoDB', 'REST APIs', 'Computer Vision'],
    category: 'Computer Vision',
    points: [
      'Built CV pipeline detecting fatigue, distraction, and unsafe driving in real time',
      'Developed event-driven REST APIs for low-latency alert generation and tracking',
      'Designed MongoDB schemas for driver behavior logs and analytics history',
      'Implemented automated tests to validate detection accuracy in production',
    ],
    githubUrl: 'https://github.com/Ponkrishnan',
    gradient: 'from-green-500/20 to-emerald-500/20',
    accentColor: '#10b981',
  },
]

export const timelineEntries: TimelineEntry[] = [
  {
    type: 'work',
    company: 'DarwinBox',
    role: 'Product Development Intern',
    location: 'Hyderabad',
    duration: 'Jan 2026 – Apr 2026',
    points: [
      'Designed and implemented scalable RESTful APIs for enterprise HR and payroll modules using Python and FastAPI',
      'Wrote unit and integration tests improving code coverage and reducing regression defects across production releases',
      'Optimized SQL queries and backend workflows reducing API response time and improving system reliability',
      'Added logging, telemetry, and metrics dashboards to monitor service health and drive operational excellence',
      'Collaborated in Agile sprints through code reviews, CI/CD pipelines, and production deployments',
    ],
    techTags: ['Python', 'FastAPI', 'SQL', 'CI/CD', 'Agile'],
    logoPlaceholder: 'DB',
  },
  {
    type: 'education',
    institution: 'Sri Eshwar College of Engineering',
    degree: 'B.Tech — Artificial Intelligence & Data Science',
    duration: '2022 – 2026',
    cgpa: '7.5+',
    coursework: [
      'Data Structures & Algorithms',
      'Object Oriented Programming',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'System Design',
      'Software Engineering',
    ],
    logoPlaceholder: 'SE',
  },
]

export const certifications: Certification[] = [
  {
    id: 'aws-cloud-quest',
    name: 'AWS Cloud Quest: Cloud Practitioner',
    issuer: 'Amazon Web Services',
    link: 'https://www.credly.com/badges/a897819a-28eb-4b6e-83cd-2d551edce741/public_url',
    category: 'Cloud',
  },
  {
    id: 'nptel-cloud',
    name: 'Cloud Computing (Elite)',
    issuer: 'NPTEL — IIT',
    link: 'https://drive.google.com/file/d/1AlVEIrL-f_hkd__S5qX9O9k5cE_flgpr/view',
    category: 'Cloud',
  },
  {
    id: 'java-udemy',
    name: 'Java Programming',
    issuer: 'Udemy',
    link: 'https://drive.google.com/file/d/10tCBEQrc_k7DRdEFh7xHsQ77UmIKP3Ha/view',
    category: 'Programming',
  },
  {
    id: 'dsa-udemy',
    name: 'DSA using C / C++',
    issuer: 'Udemy',
    link: 'https://drive.google.com/file/d/10tCBEQrc_k7DRdEFh7xHsQ77UmIKP3Ha/view',
    category: 'DSA',
  },
]
