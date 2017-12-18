import React from 'react'

// Components
import { ListContainer } from 'components/ListItem/ListItem.s'
import { Link } from 'react-router-dom'
import { Box, Image, Subhead } from 'rebass'
import { setDisplayName } from 'recompose'

const enhance = setDisplayName<ListItemProps>('ListItem')

export const ListItem = enhance((props) => (
  <ListContainer>
    <Link to={ props.imageLink || props.link }>
      <Image mr={ 3 } width={ 64 } height={ 64 } src={ props.imageSrc } />
    </Link>
    <Box>
      <Subhead>
        <Link to={ props.link }>{ props.title }</Link>
      </Subhead>
      { props.children }
    </Box>
  </ListContainer>
))

interface ListItemProps {
  link: string
  imageLink?: string
  imageSrc: string
  title: string
}
