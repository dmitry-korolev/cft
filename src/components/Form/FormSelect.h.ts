import { HTMLProps } from 'react'

export type FormSelectProps<N extends string> = HTMLProps<HTMLSelectElement> & {
  name: N
  values: string[]
  options: Array<{ value: string; label?: string }>
  size?: number
  setFieldValue: (name: N, values: string[]) => any
}
