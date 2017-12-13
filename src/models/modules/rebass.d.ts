declare module 'rebass' {
  import { ComponentType, StatelessComponent } from 'react'

  type S = string | string[]
  type N = number | number[]
  type B = boolean | boolean[]

  interface MarginPadding {
    m: S | N
    mt: S | N
    mr: S | N
    mb: S | N
    ml: S | N
    mx: S | N
    my: S | N
    p: S | N
    pt: S | N
    pr: S | N
    pb: S | N
    pl: S | N
    px: S | N
    py: S | N
  }

  type SC<T> = StatelessComponent<Partial<T & MarginPadding>>

  export const Flex: SC<{
    align: S
    justify: S
    direction: S
    wrap: B
    column: B
  }>

  export const Box: SC<{
    w: S | N
    width: S | N
    flex: S
    order: S | N
    is: ComponentType | string
  }>

  export const Text: SC<{
    color: string
    bold: boolean
    center: boolean
    bg: string
    children: string
  }>
}
