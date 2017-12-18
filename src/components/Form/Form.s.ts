import { Input, Label, Textarea } from 'rebass'
import styled from 'styled-components'

export const FormInputContainer = styled.div`
  position: relative;

  > ${Input}, ${Textarea} {
    width: 100%;
  }
`

export const FormError = styled.div`
  position: absolute;
  bottom: -16px;
  left: 0;

  color: INDIANRED;
  font-size: small;
`

export const FormLabel = styled(Label)`
  justify-content: space-between;

  > ${FormInputContainer} {
    width: 450px;
  }
`
