import React from 'react'
import { Button, Input, Select, Textarea } from 'rebass'
import { setDisplayName } from 'recompose'

// Models
import { BotAddFormProps } from 'components/BotAdd/BotAddForm.h'

const enhance = setDisplayName<BotAddFormProps>('BotAddForm')

export const BotAddForm = enhance((props) => (
  <form>
    <Input name='title' id='title' />
    <Input name='picture' id='picture' />
    <Select name='owner' id='owner'>
      { props.owners.map((o) => (
        <option key={ o.value } value={ o.value }>
          { o.value || o.label }
        </option>
      )) }
    </Select>
    <Textarea name='description' id='description' />
    <Button type='submit'>Submit</Button>
  </form>
))
