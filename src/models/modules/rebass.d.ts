declare module 'rebass' {
  import { ComponentType, StatelessComponent } from 'react'

  type A<T> = T | T[]
  type Any = A<string | number | boolean>
  type S = A<string>
  type N = A<number>
  type B = A<boolean>
  type SN = A<string | number | null>

  interface Styled {
    width: SN
    w: SN

    fontSize: SN
    f: SN

    color: S
    bg: S

    m: SN
    mt: SN
    mr: SN
    mb: SN
    ml: SN
    mx: SN
    my: SN
    p: SN
    pt: SN
    pr: SN
    pb: SN
    pl: SN
    px: SN
    py: SN

    is: ComponentType | string | any
  }

  type SC<T> = StatelessComponent<Partial<T & Styled>>

  export const Flex: SC<{
    align: S
    justify: S
    direction: S
    wrap: B
    column: B
  }>

  export const Box: SC<{
    w: SN
    width: SN
    flex: S
    order: SN
  }>

  export const Text: SC<{
    bold: B
    center: B
  }>

  export const BackgroundImage: SC<{
    ratio: S
    src: string
  }>

  export const NavLink: SC<{
    href?: string
    to?: string
  }>

  export const Link: SC<{
    href?: string
    to?: string
  }>

  export const Card: SC<{}>
  export const Subhead: SC<{}>
  export const Small: SC<{}>
  export const Toolbar: SC<{}>
  export const Divider: SC<{}>
}
