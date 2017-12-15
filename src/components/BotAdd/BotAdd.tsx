import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'

// Components
import { Box, Heading } from 'rebass'

// Actions
import { loadBotsFail, loadBotsNextPage } from 'store/bots/actions'

// Models
import { BotAddDispatchProps } from 'components/BotAdd/BotAdd.h'
import { BotAddForm } from 'components/BotAdd/BotAddForm'

const connectToState = connect(null, {
  loadBotsNextPage,
  loadBotsFail
})
const enhance = compose<BotAddDispatchProps, {}>(connectToState, setDisplayName('BotAdd'))

export const BotAdd = enhance((props) => {
  return (
    <Box mt={ 3 }>
      <Heading center>Добавление нового бота</Heading>
      <BotAddForm onSubmit={ props.loadBotsNextPage } onError={ props.loadBotsFail } />
    </Box>
  )
})
