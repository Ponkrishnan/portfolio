import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-white/10 text-primary border border-white/10 hover:bg-white/15',
        blue:
          'bg-accent-blue/10 text-accent-blue border border-accent-blue/20 hover:bg-accent-blue/20',
        purple:
          'bg-accent-purple/10 text-accent-purple border border-accent-purple/20 hover:bg-accent-purple/20',
        green:
          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20',
        outline:
          'border border-white/20 text-muted hover:border-white/40 hover:text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
