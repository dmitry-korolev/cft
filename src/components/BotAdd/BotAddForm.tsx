import React, { FormEvent } from 'react'
import { Button, Input, Select, Textarea } from 'rebass'
import { setDisplayName } from 'recompose'

// Models
import { BotAddFormProps } from 'components/BotAdd/BotAddForm.h'

const enhance = setDisplayName<BotAddFormProps>('BotAddForm')

export const BotAddForm = enhance((props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSubmit()
  }

  return (
    <form onSubmit={ handleSubmit }>
      <Input name='title' id='title' mt={ 3 } />
      <Input name='picture' id='picture' mt={ 3 } />
      <Select name='owner' id='owner' mt={ 3 }>
        { props.owners.map((o) => (
          <option key={ o.value } value={ o.value }>
            { o.value || o.label }
          </option>
        )) }
      </Select>
      <Textarea name='description' id='description' mt={ 3 } />
      <Button type='submit' mt={ 3 }>
        Добавить
      </Button>
    </form>
  )
})
