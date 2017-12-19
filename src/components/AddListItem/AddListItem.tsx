// Utils
import React from 'react'
import { Link } from 'react-router-dom'
import { setDisplayName } from 'recompose'

// Components
import { Add } from 'grommet-icons'
import { Box, Media, NavLink, Subhead } from 'rebass'

// Models
import { AddListItemProps } from 'components/AddListItem/AddListItem.h'

const enhance = setDisplayName<AddListItemProps>('AddListItem')

export const AddListItem = enhance((props) => {
  return (
    <NavLink to={ props.link } is={ Link } w={ '100%' } p={ 3 } py={ 3 }>
      <Media>
        <Box mr={ 3 } w={ 64 }>
          <Add />
        </Box>
        <Box>
          <Subhead>{ props.title }</Subhead>
        </Box>
      </Media>
    </NavLink>
  )
})
