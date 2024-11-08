import * as React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ children, className = '', ...props }: CardProps) {
  const baseStyles = 'rounded-lg border border-gray-200 bg-white shadow-sm'
  const combinedClassName = `${baseStyles} ${className}`

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  )
}
