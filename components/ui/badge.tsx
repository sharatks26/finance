import * as React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary'
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold'
  const variantStyles = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  )
}
