import React from 'react'
import { RouteComponentProps } from 'react-router'

// Models
import { NavigationProps } from 'containers/App/App.h'

export const Bot = (props: RouteComponentProps<NavigationProps>) => {
  return <div>{ props.match.params.botId }</div>
}
