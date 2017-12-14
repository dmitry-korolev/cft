import React from 'react'
import { setDisplayName } from 'recompose'

// Components
import { Heading } from 'rebass'

const enhance = setDisplayName('BotAdd')

export const BotAdd = enhance(() => {
  return <Heading>Добавление нового бота</Heading>
})
