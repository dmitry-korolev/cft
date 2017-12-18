import { FormNextLink, FormPreviousLink } from 'grommet-icons'
import { Box } from 'rebass'
import styled from 'styled-components'

export const UserListNav = styled(Box)`
  display: flex;
  justify-content: space-between;
`

export const UserListNext = styled(FormNextLink)`
  transform: translateY(25%);
`

export const UserListPrev = styled(FormPreviousLink)`
  transform: translateY(25%);
`
