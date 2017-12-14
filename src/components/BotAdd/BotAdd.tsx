import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName, withStateHandlers } from 'recompose'

// Components
import { Box, Heading } from 'rebass'

// Actions
import { loadBotsNextPage } from 'store/bots/actions'

// Models
import {
  BotAddDispatchProps,
  BotAddFormState,
  BotAddFormStateHandlers
} from 'components/BotAdd/BotAdd.h'
import { BotAddForm } from 'components/BotAdd/BotAddForm'

const formState = withStateHandlers(
  {
    title: '',
    owner: '',
    description: '',
    picture: ''
  },
  {
    setState: () => (state) => state
  }
)
const connectToState = connect(null, {
  loadBotsNextPage
})
const enhance = compose<BotAddFormState & BotAddFormStateHandlers & BotAddDispatchProps, {}>(
  connectToState,
  formState,
  setDisplayName('BotAdd')
)

const statusOptions = [
  {
    label: 'Single',
    value: 'single'
  },
  {
    label: 'In a Relationship',
    value: 'relationship'
  },
  {
    label: "It's Complicated",
    value: 'complicated'
  }
]

export const BotAdd = enhance((props) => {
  return (
    <Box mt={ 3 }>
      <Heading center>Добавление нового бота</Heading>
      <BotAddForm owners={ statusOptions } onSubmit={ props.loadBotsNextPage } />
    </Box>
  )
})
