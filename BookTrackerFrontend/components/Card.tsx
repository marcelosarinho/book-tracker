import type { ComponentProps } from "react";

export function Card(props: ComponentProps<'section'>) {
  const { className = '', ...rest } = props;

  return (
    <section {...rest} className={`border border-zinc-200 rounded-md p-6 ${className}`}>
      {props.children}
    </section>
  )
}