declare module 'rebass' {
  import { ComponentType, HTMLProps, StatelessComponent } from 'react'
  import { StyledComponentClass } from 'styled-components'

  type A<T> = T | T[]
  type Any = A<string | number | boolean>
  type S = A<string>
  type N = A<number>
  type B = A<boolean>
  type SN = A<string | number | null>

  interface Theme {
    breakpoints?: number[]
    space?: number[]
    fontSizes?: number[]
    weights?: number[]
    colors?: {
      [K: string]: string
    }
    radius?: number
    font?: string
    monospace?: string
  }

  interface Styled {
    width: SN
    w: SN

    height: SN
    h: SN

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
    to: string
  }

  type SC<T> = StyledComponentClass<Partial<T & Styled>, Theme>

  export const Flex: SC<{
    align: S
    justify: A<'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'>
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

  export const NavLink: SC<
    {
      href?: string
      to?: string
    } & HTMLProps<HTMLAnchorElement>
  >

  export const Link: SC<
    {
      to?: string
    } & HTMLProps<HTMLAnchorElement>
  >

  export const Heading: SC<{
    left: boolean
    center: boolean
    right: boolean
    justify: boolean
    bold: boolean
    caps: boolean
  }>

  export const Tooltip: SC<{
    text: string
  }>

  export const Label: SC<HTMLProps<HTMLLabelElement>>
  export const Input: SC<HTMLProps<HTMLInputElement>>
  export const Select: SC<HTMLProps<HTMLSelectElement>>
  export const Textarea: SC<HTMLProps<HTMLTextAreaElement>>
  export const Radio: SC<HTMLProps<HTMLInputElement>>

  export const Fixed: SC<
    {
      top: boolean
      bottom: boolean
      left: boolean
      right: boolean
    } & HTMLProps<HTMLDivElement>
  >

  export const Overlay: SC<{}>
  export const Truncate: SC<{}>
  export const Card: SC<{}>
  export const Small: SC<{}>
  export const Toolbar: SC<{}>
  export const Divider: SC<{}>
  export const Container: SC<{ maxWidth: number }>
  export const Media: SC<{}>

  export const Image: SC<HTMLProps<HTMLImageElement>>
  export const Button: SC<HTMLProps<HTMLButtonElement>>
  export const ButtonTransparent: SC<HTMLProps<HTMLButtonElement>>
  export const Subhead: SC<HTMLProps<HTMLHeadingElement>>

  export const Banner: SC<
    HTMLProps<HTMLDivElement> & {
      backgroundImage: string
    }
  >

  export const Provider: StatelessComponent<{
    theme?: Theme
  }>
}
