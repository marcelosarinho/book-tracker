import type { ComponentProps } from 'react'

export function Label(props: ComponentProps<'label'>) {
  const { children, htmlFor, className = '', ...rest } = props;

  return (
    <label className={`text-sm font-medium block ${className}`} htmlFor={htmlFor} {...rest}>
      {children}
    </label>
  )
}