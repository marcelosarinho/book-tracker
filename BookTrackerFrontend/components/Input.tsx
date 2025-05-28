import type { ComponentProps } from "react";

export function Input(props: ComponentProps<'input'>) {
  const { id, name, value, onChange, className = '', ...rest } = props;

  return (
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none focus-visible:ring-offset-2 text-sm w-full p-2 rounded-md border border-zinc-200 ${className}`}
      {...rest}
    />
  )
}