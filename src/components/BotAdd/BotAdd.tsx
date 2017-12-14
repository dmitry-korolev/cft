import React from 'react'
import { compose, setDisplayName, withStateHandlers } from 'recompose'

// Components
import { Heading } from 'rebass'

// Models
import { BotAddFormState, BotAddFormStateHandlers } from 'components/BotAdd/BotAdd.h'
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
const enhance = compose<BotAddFormState & BotAddFormStateHandlers, {}>(
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

export const BotAdd = enhance(() => {
  return (
    <div>
      <Heading center>Добавление нового бота</Heading>
      <BotAddForm owners={ statusOptions } />
    </div>
  )
})
