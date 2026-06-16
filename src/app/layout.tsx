import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'
import '@/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ponkrishnan.dev'),
  title: 'Ponkrishnan P | AI & Data Science Engineer',
  description:
    'BTech AI&DS @ Sri Eshwar. Backend developer specializing in FastAPI, Spring Boot, LLM pipelines, and cloud systems. Interned at DarwinBox.',
  keywords: [
    'Ponkrishnan',
    'AI Engineer',
    'Data Science',
    'FastAPI',
    'Spring Boot',
    'LLM',
    'RAG',
    'Backend Developer',
    'Machine Learning',
    'Portfolio',
  ],
  authors: [{ name: 'Ponkrishnan P', url: 'https://github.com/Ponkrishnan' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ponkrishnan.dev',
    siteName: 'Ponkrishnan P — Portfolio',
    title: 'Ponkrishnan P | AI & Data Science Engineer',
    description:
      'BTech AI&DS @ Sri Eshwar. Building scalable backends, LLM pipelines, and intelligent systems.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ponkrishnan P — Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ponkrishnan P | AI & Data Science Engineer',
    description:
      'BTech AI&DS @ Sri Eshwar. Building scalable backends, LLM pipelines, and intelligent systems.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={{ colorScheme: 'dark' }}
    >
      <body className={GeistSans.className}>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(10,15,30,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f1f5f9',
              backdropFilter: 'blur(12px)',
            },
          }}
        />
      </body>
    </html>
  )
}
