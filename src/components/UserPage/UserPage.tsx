import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle, setDisplayName } from 'recompose'

// Components
import { Link } from 'react-router-dom'
import { Heading, Image, Media, Text } from 'rebass'

// Actions
import { loadUser } from 'store/users/actions'

// Models
import { UserPageProps } from 'components/UserPage/UserPage.h'
import { NavigationProps } from 'containers/App/App.h'
import { RouteComponentProps } from 'react-router'
import { State } from 'store/store.h'

const connectToStore = connect(
  (state: State, ownProps: RouteComponentProps<NavigationProps>) => ({
    user: state.users.users.find((user) => user._id === ownProps.match.params.userId),
    userId: ownProps.match.params.userId,
    isLoading: state.users.isLoading
  }),
  {
    loadUser
  }
)
const loadUserOnMount = lifecycle<UserPageProps, {}>({
  componentWillUpdate (nextProps) {
    if (!nextProps.user && !nextProps.isLoading) {
      this.props.loadUser(this.props.userId)
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
        <Link to={ `/users/${user._id}/edit` }>Редактировать</Link>
      </Text>
    </div>
  ) : null
})
