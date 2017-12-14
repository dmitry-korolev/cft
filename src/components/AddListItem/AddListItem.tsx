// Utils
import React from 'react'
import { Link } from 'react-router-dom'
import { setDisplayName } from 'recompose'

// Components
import { Add } from 'grommet-icons'
import { Box, ButtonTransparent, Media, Subhead } from 'rebass'

// Models
import { AddListItemProps } from 'components/AddListItem/AddListItem.h'

const enhance = setDisplayName<AddListItemProps>('AddListItem')

export const AddListItem = enhance((props) => {
  return (
    <ButtonTransparent to={ props.link } is={ Link } w={ '100%' } p={ 0 } py={ 2 }>
      <Media>
        <Box mr={ 3 } w={ 64 }>
          <Add />
        </Box>
        <Box>
          <Subhead>{ props.title }</Subhead>
        </Box>
      </Media>
    </ButtonTransparent>
  )
})
