import React from 'react'
import { Box, Flex, Text } from 'rebass'

export const App = () => (
  <Flex mx={ -2 }>
    <Box w={ 1 / 2 } px={ 2 }>
      <Text p={ 1 } color='white' bg='blue'>
        Half
      </Text>
    </Box>
    <Box w={ 1 / 2 } px={ 2 }>
      <Text p={ 1 } color='white' bg='blue'>
        Half
      </Text>
    </Box>
  </Flex>
)
