import React from 'react'
import { RouteComponentProps } from 'react-router'

// Models
import { NavigationProps } from 'containers/App/App.h'
import { Text } from 'rebass'

export const Bot = (props: RouteComponentProps<NavigationProps>) => {
  return <Text p={ 2 }>{ props.match.params.botId }</Text>
}
