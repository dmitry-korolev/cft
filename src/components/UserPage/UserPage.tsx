import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'

// Components
import { Link } from 'react-router-dom'
import { Heading, Image, Media, Text } from 'rebass'

// Models
import { UserPageProps } from 'components/UserPage/UserPage.h'
import { NavigationProps } from 'containers/App/App.h'
import { RouteComponentProps } from 'react-router'
import { State } from 'store/store.h'

const connectToStore = connect(
  (state: State, ownProps: RouteComponentProps<NavigationProps>) =>
    state.users.users.find((user) => user._id === ownProps.match.params.userId) || {}
)
const enhance = compose<UserPageProps, {}>(connectToStore, setDisplayName('UserPage'))

export const UserPage = enhance((props) => {
  return (
    <div>
      <Media mt={ 3 } w={ '100%' }>
        <Image mr={ 3 } width={ 64 } height={ 64 } src={ props.avatarUrl } />
        <Heading>{ props.name }</Heading>
      </Media>
      <Text mt={ 3 }>Email: { props.email }</Text>
      <Text mt={ 3 }>Номер телефона: { props.phone }</Text>
      <Text mt={ 3 }>Пол: { props.gender === 'female' ? '♀' : '♂' }</Text>
      <Text mt={ 3 }>
        <Link to={ `/users/${props._id}/edit` }>Редактировать</Link>
      </Text>
    </div>
  )
})
