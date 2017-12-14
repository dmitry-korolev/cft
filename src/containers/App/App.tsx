import React, { StatelessComponent } from 'react'
import { injectGlobal } from 'styled-components'

// Components
import { Bot } from 'components/Bot/Bot'
import { BotAdd } from 'components/BotAdd/BotAdd'
import { BotList } from 'components/BotList/BotList'
import { Sidebar } from 'components/Sidebar/Sidebar'
import { TopBar } from 'components/TopBar/TopBar'
import { Route, Switch } from 'react-router-dom'
import { Box, Container, Flex, Provider } from 'rebass'

// Constants
import { listWidth, sidebarWidth } from 'constants/styles'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300&subset=cyrillic,latin-ext');
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { cursor: pointer; }
`

const theme = {
  radius: 0,
  font: 'Roboto, sans-serif'
}

export const App: StatelessComponent = () => (
  <Provider theme={ theme }>
    <Container maxWidth={ 1280 }>
      <TopBar />

      <Flex mx={ -2 }>
        <Box order={ 2 } px={ 2 } flex={ '0 0 auto' } w={ listWidth }>
          <Route path='/bots' component={ BotList } />
        </Box>
        <Box order={ 3 } px={ 2 } flex={ '1 1 auto' }>
          <Switch>
            <Route path='/bots/add' component={ BotAdd } />
            <Route path='/bots/:botId' component={ Bot } />
          </Switch>
        </Box>
        <Box order={ 0 } px={ 2 } flex={ '0 0 auto' } w={ sidebarWidth }>
          <Sidebar />
        </Box>
      </Flex>
    </Container>
  </Provider>
)

App.displayName = 'App'
