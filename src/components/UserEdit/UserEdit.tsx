import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { compose, setDisplayName } from 'recompose'

// Components
import { UserForm } from 'components/UserForm/UserForm'
import { NavigationProps } from 'containers/App/App.h'
import { Box, Heading } from 'rebass'

// Actions
import { updateUser } from 'store/users/actions'

// Models
import { UserEditProps } from 'components/UserEdit/UserEdit.h'
import { State } from 'store/store.h'

const connectToState = connect(
  (state: State, ownProps: RouteComponentProps<NavigationProps>) => ({
    user: state.users.users.find((user) => user._id === ownProps.match.params.userId)
  }),
  {
    updateUser
  }
)
const enhance = compose<UserEditProps, {}>(connectToState, setDisplayName('UserEdit'))

export const UserEdit = enhance((props) => {
  return props.user ? (
    <Box mt={ 3 }>
      <Heading center>Редактирование пользователя { props.user.name }</Heading>
      <UserForm
        onSubmit={ props.updateUser }
        initialValues={ props.user }
        buttonText='Обновить'
        id={ props.user._id }
      />
    </Box>
  ) : null
})
