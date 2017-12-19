import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'

// Components
import { Link } from 'react-router-dom'
import { Heading, Image, Media, Text } from 'rebass'

// Models
import { BotPageProps } from 'components/BotPage/BotPage.h'
import { NavigationProps } from 'containers/App/App.h'
import { RouteComponentProps } from 'react-router'
import { State } from 'store/store.h'

const connectToStore = connect(
  (state: State, ownProps: RouteComponentProps<NavigationProps>) =>
    state.bots.bots.find((bot) => bot._id === ownProps.match.params.botId) || {}
)
const enhance = compose<BotPageProps, {}>(connectToStore, setDisplayName('BotPage'))

export const BotPage = enhance((props) => {
  return (
    <div>
      <Media mt={ 3 } w={ '100%' }>
        <Image mr={ 3 } width={ 64 } height={ 64 } src={ props.picture } />
        <Heading>{ props.title }</Heading>
      </Media>
      <Text mt={ 3 }>{ props.description }</Text>
      <Text mt={ 3 }>
        <Link to={ `/bots/${props._id}/edit` }>Редактировать</Link>
      </Text>
    </div>
  )
})
