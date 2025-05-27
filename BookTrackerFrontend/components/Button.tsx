import type { ComponentProps } from 'react'

const variants = {
  primary: 'bg-black text-white hover:bg-zinc-800',
  outlined: 'border border-zinc-200 hover:bg-zinc-200 hover:text-zinc-700'
}

const sizes = {
  small: 'px-3 py-2',
  medium: 'px-4 py-2.5'
}

export function Button(props: ComponentProps<'button'> & { variant?: 'primary' | 'outlined', size?: 'small' | 'medium' }) {
  const { children, className, id, variant = 'primary', size = 'medium', ...rest } = props;

  return (
    <button id={id} {...rest} className={`text-sm font-medium rounded hover:cursor-pointer transition-colors ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  )
}

export function IconButton(props: ComponentProps<'button'>) {
  const { children, id, ...rest } = props;

  return (
    <button id={id} {...rest} className='p-2 rounded-md hover:bg-zinc-200 hover:cursor-pointer transition-colors'>
      {children}
    </button>
  )
}