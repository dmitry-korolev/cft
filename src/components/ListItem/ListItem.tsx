import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Image, Media, Subhead } from 'rebass'
import { setDisplayName } from 'recompose'

const enhance = setDisplayName<ListItemProps>('ListItem')

export const ListItem = enhance((props) => (
  <Media>
    <Link to={ props.imageLink || props.link }>
      <Image mr={ 3 } width={ 64 } height={ 64 } src={ props.imageSrc } />
    </Link>
    <Box>
      <Subhead>
        <Link to={ props.link }>{ props.title }</Link>
      </Subhead>
      { props.children }
    </Box>
  </Media>
))

interface ListItemProps {
  link: string
  imageLink?: string
  imageSrc: string
  title: string
}
