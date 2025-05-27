import type { ComponentProps } from "react";

export function Table(props: ComponentProps<'table'>) {
  const { children, className = '', ...rest } = props;

  return (
    <table {...rest} className={`w-full ${className}`}>
      {children}
    </table>
  )
}

Table.Head = function TableHead(props: ComponentProps<'thead'>) {
  const { children, className = '', ...rest } = props;

  return (
    <thead {...rest} className={`border-b border-zinc-200 ${className}`}>
      {children}
    </thead>
  )
}

Table.Row = function TableRow(props: ComponentProps<'tr'>) {
  const { children, className = '', ...rest } = props;

  return (
    <tr {...rest} className={`hover:bg-zinc-100 transition-colors border-b border-zinc-200 ${className}`}>
      {children}
    </tr>
  )
}

Table.HeadCell = function TableHeadCell(props: ComponentProps<'th'>) {
  const { children, className = '', ...rest } = props;

  return (
    <th {...rest} className={`font-medium px-4 h-12 ${className}`}>
      {children}
    </th>
  )
}

Table.Body = function TableBody(props: ComponentProps<'tbody'>) {
  const { children, className = '', ...rest } = props;

  return (
    <tbody {...rest} className={`[&_tr:last-child]:border-0 ${className}`}>
      {children}
    </tbody>
  )
}

Table.Data = function TableData(props: ComponentProps<'td'>) {
  const { children, className = '', ...rest } = props;

  return (
    <td {...rest} className={`p-4 ${className}`}>
      {children}
    </td>
  )
}