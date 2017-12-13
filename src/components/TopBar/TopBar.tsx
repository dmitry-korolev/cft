import React, { StatelessComponent } from 'react'
import { NavLink, Toolbar } from 'rebass'

export const TopBar: StatelessComponent = () => (
  <Toolbar bg='gray' px={ 0 }>
    <NavLink>Hello, Admin!</NavLink>
    <NavLink ml='auto'>Exit</NavLink>
  </Toolbar>
)

TopBar.displayName = 'TopBar'
