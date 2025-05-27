import type { ComponentProps } from 'react'

export function Modal(props: ComponentProps<'dialog'>) {
  const { children, className = '', id, ...rest } = props;

  return (
    <dialog {...rest} id={id} className='block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 p-6 z-10 size-full'>
      <div className={`bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-md lg:w-1/2 md:w-2/3 w-full ${className}`}>
        {children}
      </div>
    </dialog>
  )
}

Modal.Title = function ModalTitle(props: ComponentProps<'h2'>) {
  const { children, className = '', id, ...rest } = props;

  return (
    <h2 id={id} {...rest} className={`text-lg font-bold ${className}`}>{children}</h2>
  )
}

Modal.Description = function ModalDescription(props: ComponentProps<'p'>) {
  const { children, className = '', id, ...rest } = props;

  return (
    <p id={id} className={`text-sm text-zinc-500 ${className}`} {...rest}>{children}</p>
  )
}

Modal.Header = function ModalHeader(props: ComponentProps<'div'>) {
  const { children, className = '', id, ...rest } = props;

  return (
    <div id={id} className={className} {...rest}>
      {children}
    </div>
  )
}

Modal.Body = function ModalBody(props: ComponentProps<'div'>) {
  const { children, className = '', id, ...rest } = props;

  return (
    <div id={id} className={className} {...rest}>
      {children}
    </div>
  )
}

Modal.Footer = function ModalFooter(props: ComponentProps<'footer'>) {
  const { children, className = '', id, ...rest } = props;

  return(
    <footer id={id} className={`flex gap-2 mt-6 justify-end ${className}`} {...rest}>
      {children}
    </footer>
  )
}