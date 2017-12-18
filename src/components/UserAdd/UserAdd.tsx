import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'

// Components
import { UserForm } from 'components/UserForm/UserForm'
import { Box, Heading } from 'rebass'

// Actions
import { saveUser } from 'store/users/actions'

// Models
import { UserAddDispatchProps } from 'components/UserAdd/UserAdd.h'

const connectToState = connect(null, {
  saveUser
})
const enhance = compose<UserAddDispatchProps, {}>(connectToState, setDisplayName('UserAdd'))

export const UserAdd = enhance((props) => {
  return (
    <Box mt={ 3 }>
      <Heading center>Добавление нового пользователя</Heading>
      <UserForm onSubmit={ props.saveUser } buttonText='Добавить' />
    </Box>
  )
})
