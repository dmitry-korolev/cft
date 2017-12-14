import React, { StatelessComponent } from 'react'
import { Route } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

// Components
import { Bot } from 'components/Bot/Bot'
import { BotList } from 'components/BotList/BotList'
import { Sidebar } from 'components/Sidebar/Sidebar'
import { TopBar } from 'components/TopBar/TopBar'
import { Box, Container, Flex } from 'rebass'

// Constants
import { listWidth, sidebarWidth } from 'constants/styles'

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
`

export const App: StatelessComponent = () => (
  <Container maxWidth={ 1280 }>
    <TopBar />

    <Flex mx={ -2 }>
      <Box order={ 2 } px={ 2 } flex={ '0 1 auto' } w={ listWidth }>
        <Route path='/bots' component={ BotList } />
      </Box>
      <Box order={ 3 } px={ 2 } flex={ '0 1 auto' } w={ `calc(100% - ${sidebarWidth + listWidth}px)` }>
        <Route path='/bots/:botId' component={ Bot } />
      </Box>
      <Box w={ sidebarWidth } px={ 2 }>
        <Sidebar />
      </Box>
    </Flex>
  </Container>
)

App.displayName = 'App'
