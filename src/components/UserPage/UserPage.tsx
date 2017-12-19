import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle, setDisplayName } from 'recompose'

// Components
import { UserPageBotNav } from 'components/UserPage/UserPage.s'
import { Link } from 'react-router-dom'
import { Heading, Image, Media, Text } from 'rebass'

// Store
import { loadBot } from 'store/bots/actions'
import { botByIdsSelector } from 'store/bots/selectors'
import { loadUser } from 'store/users/actions'

// Models
import { UserPageProps } from 'components/UserPage/UserPage.h'
import { NavigationProps } from 'containers/App/App.h'
import { RouteComponentProps } from 'react-router'
import { State } from 'store/store.h'

const connectToStore = connect(
  (state: State, ownProps: RouteComponentProps<NavigationProps>) => ({
    bots: botByIdsSelector(state),
    user: state.users.users.find((user) => user._id === ownProps.match.params.userId),
    userId: ownProps.match.params.userId,
    error: state.users.error,
    isLoading: state.users.isLoading
  }),
  {
    loadUser,
    loadBot
  }
)
const loadUserOnMount = lifecycle<UserPageProps, {}>({
  componentWillUpdate (nextProps) {
    if (!nextProps.user && !nextProps.isLoading && !nextProps.error) {
      this.props.loadUser(this.props.userId)
    }

    if (nextProps.user && nextProps.user.botIds.length) {
      nextProps.user.botIds.forEach((botId) => {
        if (!nextProps.bots[botId]) {
          this.props.loadBot(botId)
        }
      })
    }
  }
})
const enhance = compose<UserPageProps, {}>(
  connectToStore,
  loadUserOnMount,
  setDisplayName('UserPage')
)

export const UserPage = enhance((props) => {
  const { user } = props
  return user ? (
    <div>
      <Media mt={ 3 } w={ '100%' }>
        <Image mr={ 3 } width={ 64 } height={ 64 } src={ user.avatarUrl } />
        <Heading>{ user.name }</Heading>
      </Media>
      <Text mt={ 3 }>Email: { user.email }</Text>
      <Text mt={ 3 }>Номер телефона: { user.phone }</Text>
      <Text mt={ 3 }>Пол: { user.gender === 'female' ? '♀' : '♂' }</Text>
      <Text mt={ 3 }>
        Использует боты:{ ' ' }
        <UserPageBotNav>
          { user.botIds.map((botId) => {
            const bot = props.bots[botId]
            return bot ? (
              <Link to={ `/bots/${botId}` } key={ botId }>
                { bot.title }
              </Link>
            ) : null
          }) }
        </UserPageBotNav>
      </Text>
      <Text mt={ 3 }>
        <Link to={ `/users/${user._id}/edit` }>Редактировать</Link>
      </Text>
    </div>
  ) : null
})
