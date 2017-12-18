import React from 'react'

// Components
import { UserEdit } from 'components/UserEdit/UserEdit'
import { UserPage } from 'components/UserPage/UserPage'
import { Route, Switch } from 'react-router'

export const User = () => {
  return (
    <Switch>
      <Route path='/users/:userId/edit' component={ UserEdit } />
      <Route path='/users/:userId' component={ UserPage } />
    </Switch>
  )
}
