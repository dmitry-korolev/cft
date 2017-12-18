import { withFormik } from 'formik'
import React from 'react'
import { Button, Input, Textarea } from 'rebass'

import { BotFormErrors, BotFormProps, BotFormValues } from 'components/BotForm/BotForm.h'

const enhance = withFormik<BotFormProps, BotFormValues>({
  mapPropsToValues: (props) =>
    props.initialValues || {
      description: '',
      picture: '',
      title: ''
    },

  validate: (values: BotFormValues) => {
    const errors: BotFormErrors = {}
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

  handleSubmit: (values, bag) => {
    bag.props.onSubmit(values, bag)
  },

  displayName: 'BotForm'
})

export const BotForm = enhance((props) => {
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
