import React, { StatelessComponent } from 'react'

import { Robot, User } from 'grommet-icons'
import { Link } from 'react-router-dom'
import { Box, Divider, NavLink, Text } from 'rebass'

export const Sidebar: StatelessComponent = () => (
  <Box>
    <NavLink w={ 1 } to='/bots' f={ 3 } is={ Link } p={ 3 }>
      Боты{ ' ' }
      <Text ml='auto'>
        <Robot />
      </Text>
    </NavLink>
    <Divider w={ 1 } my={ 0 } />
    <NavLink w={ 1 } to='/users' f={ 3 } is={ Link } p={ 3 }>
      Пользователи{ ' ' }
      <Text ml='auto'>
        <User />
      </Text>
    </NavLink>
  </Box>
)
