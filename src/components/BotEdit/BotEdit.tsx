import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { compose, setDisplayName } from 'recompose'

// Components
import { BotForm } from 'components/BotForm/BotForm'
import { NavigationProps } from 'containers/App/App.h'
import { Box, Heading } from 'rebass'

// Actions
import { updateBot } from 'store/bots/actions'

// Models
import { BotEditProps } from 'components/BotEdit/BotEdit.h'
import { State } from 'store/store.h'

const connectToState = connect(
  (state: State, ownProps: RouteComponentProps<NavigationProps>) => ({
    bot: state.bots.bots.find((bot) => bot._id === ownProps.match.params.botId)
  }),
  {
    updateBot
  }
)
const enhance = compose<BotEditProps, {}>(connectToState, setDisplayName('BotEdit'))

export const BotEdit = enhance((props) => {
  return props.bot ? (
    <Box mt={ 3 }>
      <Heading center>Редактирование бота { props.bot.title }</Heading>
      <BotForm
        onSubmit={ props.updateBot }
        initialValues={ props.bot }
        buttonText='Обновить'
        id={ props.bot._id }
      />
    </Box>
  ) : null
})
