import type { ComponentProps } from "react";

export function Input(props: ComponentProps<'input'> & { errors?: string[] }) {
  const { id, name, value, onChange, className = '', errors = [], ...rest } = props;

  return (
    <>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none focus-visible:ring-offset-2 text-sm w-full p-2 rounded-md border ${className} ${errors.length > 0 ? 'border-red-500' : 'border-zinc-200'}`}
        {...rest}
      />
      {errors.length > 0 && errors.map((error, index) => (
        <p key={index} className="text-xs text-red-500 mt-1">
          {error}
        </p>
      ))}
    </>
  )
}