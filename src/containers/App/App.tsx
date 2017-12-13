import React, { StatelessComponent } from 'react'
import { Route } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

// Components
import { BotList } from 'components/BotList/BotList'
import { Sidebar } from 'components/Sidebar/Sidebar'
import { TopBar } from 'components/TopBar/TopBar'
import { Box, Flex } from 'rebass'

// Constants
import { sidebarWidth } from 'constants/styles'

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
`

export const App: StatelessComponent = () => (
  <div>
    <TopBar />

    <Flex mx={ -2 }>
      <Box order={ [null, 2] } px={ 2 } flex={ '0 1 auto' } w={ [1, `calc(100% - ${sidebarWidth}px)`] }>
        <Route path='/bots' component={ BotList } />
      </Box>
      <Box w={ [1, sidebarWidth] } px={ 2 }>
        <Sidebar />
      </Box>
    </Flex>
  </div>
)

App.displayName = 'App'
