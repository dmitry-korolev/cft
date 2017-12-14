import styled from 'styled-components'

// Components
import { Add } from 'grommet-icons'
import { ButtonTransparent } from 'rebass'

export const ButtonPointer = styled(ButtonTransparent)`
  cursor: pointer;
`

export const CenteredAdd = styled(Add)`
  transform: translateX(-50%);
`
