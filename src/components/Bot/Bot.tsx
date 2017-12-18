import React from 'react'

// Components
import { BotEdit } from 'components/BotEdit/BotEdit'
import { BotPage } from 'components/BotPage/BotPage'
import { Route, Switch } from 'react-router'

export const Bot = () => {
  return (
    <Switch>
      <Route path='/bots/:botId/edit' component={ BotEdit } />
      <Route path='/bots/:botId' component={ BotPage } />
    </Switch>
  )
}
