// Utils
import React from 'react'
import { Link } from 'react-router-dom'
import { compose, defaultProps, setDisplayName } from 'recompose'

// Components
import { ButtonPointer, CenteredAdd } from 'components/AddListItem/AddListItem.s'
import { Box, Media, Subhead } from 'rebass'

const enhance = compose<OwnProps, OwnProps>(
  setDisplayName('AddListItem'),
  defaultProps({
    onClick: () => undefined
  })
)

export const AddListItem = enhance((props) => {
  return (
    <ButtonPointer to={ props.link } is={ Link } w={ '100%' }>
      <Media>
        <Box mr={ 3 } w={ 32 }>
          <CenteredAdd size='large' />
        </Box>
        <Box>
          <Subhead>{ props.title }</Subhead>
        </Box>
      </Media>
    </ButtonPointer>
  )
})

interface OwnProps {
  title: string
  link: string
}
