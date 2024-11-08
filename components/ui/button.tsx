import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'
  size?: 'default' | 'sm'
}

export function Button({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `inline-flex items-center justify-center rounded-md font-medium
    transition-colors focus-visible:outline-none disabled:opacity-50`

  const variantStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'hover:bg-gray-100 text-gray-700',
  }

  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
  }

  const combinedClassName =
    `${baseStyles} ${variantStyles[variant]} ` + `${sizeStyles[size]} ${className}`

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}
