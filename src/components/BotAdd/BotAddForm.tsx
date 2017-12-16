import { withFormik } from 'formik'
import React from 'react'
import { Button, Input, Textarea } from 'rebass'

// Utils
import { botsServiceName } from 'api/bots/bots'
import { apiEndpoint } from 'api/utils/apiEndpoint'

// Models
import { BotAddFormErrors, BotAddFormProps, BotAddFormValues } from 'components/BotAdd/BotAddForm.h'

const enhance = withFormik<BotAddFormProps, BotAddFormValues>({
  mapPropsToValues: () => ({
    description: '',
    picture: '',
    title: ''
  }),

  // Custom sync validation
  validate: (values: BotAddFormValues) => {
    const errors: BotAddFormErrors = {}
    if (!values.description) {
      errors.description = 'Description is required!'
    }
    if (!values.picture) {
      errors.picture = 'Image is required!'
    }
    if (!values.title) {
      errors.title = 'Title is required!'
    }
    return errors
  },

  handleSubmit: async (values, props) => {
    return fetch(apiEndpoint(botsServiceName), {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        props.resetForm()
        props.setSubmitting(false)
        props.props.onSubmit()
      })
      .catch((error) => {
        props.setSubmitting(false)
        props.props.onError(error)
      })
  },

  displayName: 'BotAddForm'
})

export const BotAddForm = enhance((props) => {
  const { handleChange, handleBlur, handleSubmit, values, isSubmitting, touched, errors } = props

  return (
    <form onSubmit={ handleSubmit }>
      <Input
        onChange={ handleChange }
        value={ values.title }
        onBlur={ handleBlur }
        name='title'
        id='title'
        placeholder='Название бота'
        mt={ 3 }
      />
      { touched.title && errors.title && <div>{ errors.title }</div> }
      <Input
        onChange={ handleChange }
        value={ values.picture }
        onBlur={ handleBlur }
        name='picture'
        id='picture'
        placeholder='Ссылка на изображение'
        mt={ 3 }
      />
      <Textarea
        onChange={ handleChange }
        value={ values.description }
        onBlur={ handleBlur }
        name='description'
        id='description'
        mt={ 3 }
      />
      <Button type='submit' mt={ 3 } disabled={ isSubmitting }>
        Добавить
      </Button>
    </form>
  )
})
