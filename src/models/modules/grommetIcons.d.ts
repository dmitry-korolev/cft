declare module 'grommet-icons' {
  import { StatelessComponent } from 'react'
  type Icon = StatelessComponent<{
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'huge'
  }>

  export const Add: Icon
  export const FormEdit: Icon
  export const Robot: Icon
  export const User: Icon
}
