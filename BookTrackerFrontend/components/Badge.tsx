import type { ComponentProps } from 'react'

const colors: { [key: string]: string } = {
  zinc: 'bg-zinc-200 text-zinc-700',
  blue: 'bg-blue-200 text-blue-700',
  green: 'bg-green-200 text-green-700',
}

export function Badge(props: ComponentProps<'span'>) {
  const { children, className = '', color = 'zinc', ...rest } = props;

  return (
    <span className={`px-2 py-1 rounded-md text-xs ${colors[color]} ${className}`} {...rest}>
      {children}
    </span>
  )
}