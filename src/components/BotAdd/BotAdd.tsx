import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'

// Components
import { BotForm } from 'components/BotForm/BotForm'
import { Box, Heading } from 'rebass'

// Actions
import { saveBot } from 'store/bots/actions'

// Models
import { BotAddDispatchProps } from 'components/BotAdd/BotAdd.h'

const connectToState = connect(null, {
  saveBot
})
const enhance = compose<BotAddDispatchProps, {}>(connectToState, setDisplayName('BotAdd'))

export const BotAdd = enhance((props) => {
  return (
    <Box mt={ 3 }>
      <Heading center>Добавление нового бота</Heading>
      <BotForm onSubmit={ props.saveBot } />
    </Box>
  )
})
