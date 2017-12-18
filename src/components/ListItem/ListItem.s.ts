// Components
import { Box, Heading, Media } from 'rebass'
import styled from 'styled-components'

// Utils
import { listWidth } from 'constants/styles'

export const ListContainer = styled(Media)`
  justify-content: space-between;

  > ${Box} {
    width: calc(${listWidth}px - 64px - ${(props) => props.theme.space[3] * 2}px);

    > ${Heading} {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`
