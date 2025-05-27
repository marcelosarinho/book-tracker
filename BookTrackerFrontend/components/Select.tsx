import type { ComponentProps } from 'react'

export function Select(props: ComponentProps<'select'>) {
  const { id, children, name, value, onChange, className, ...rest } = props;

  return (
    <select id={id} name={name} value={value} onChange={onChange} className={`text-sm w-full p-2 rounded-md border border-zinc-200 ${className}`} {...rest}>
      {children}
    </select>
  )
}