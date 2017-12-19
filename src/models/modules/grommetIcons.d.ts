declare module 'grommet-icons' {
  import { HTMLProps, StatelessComponent } from 'react'
  type Icon = StatelessComponent<{
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'huge'
  }>

  export const Add: Icon
  export const FormEdit: Icon
  export const FormNextLink: Icon
  export const FormPreviousLink: Icon
  export const Robot: Icon
  export const SettingsOption: Icon
  export const StatusGood: Icon
  export const User: Icon
}
