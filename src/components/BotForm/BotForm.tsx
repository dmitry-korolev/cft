import { withFormik } from 'formik'
import React from 'react'

// Components
import { BotFormErrors, BotFormOwnProps, BotFormValues } from 'components/BotForm/BotForm.h'
import { FormError, FormInputContainer, FormLabel } from 'components/Form/Form.s'
import { Button, Input, Textarea } from 'rebass'

const enhance = withFormik<BotFormOwnProps, BotFormValues>({
  mapPropsToValues: (props) =>
    props.initialValues || {
      description: '',
      picture: '',
      title: ''
    },

  validate: (values: BotFormValues) => {
    const errors: BotFormErrors = {}
    if (!values.description) {
      errors.description = 'Пожалуйста, введите описание.'
    }
    if (!values.picture) {
      errors.picture = 'Пожалуйста, укажите ссылку на изображение.'
    }
    if (!values.title) {
      errors.title = 'Пожалуйста, укажите название бота.'
    }
    return errors
  },

  handleSubmit: (values, bag) => {
    bag.props.onSubmit(values, bag, bag.props.id)
  },

  displayName: 'BotForm'
})

export const BotForm = enhance((props) => {
  const { handleChange, handleBlur, handleSubmit, values, isSubmitting, touched, errors } = props

  return (
    <form onSubmit={ handleSubmit }>
      <FormLabel mt={ 3 }>
        Название бота:
        <FormInputContainer>
          <Input
            onChange={ handleChange }
            value={ values.title }
            onBlur={ handleBlur }
            name='title'
            id='title'
            placeholder='Название бота'
            w={ 400 }
          />
          { touched.title && errors.title && <FormError>{ errors.title }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <FormLabel mt={ 3 }>
        Ссылка на изображение:
        <FormInputContainer>
          <Input
            onChange={ handleChange }
            value={ values.picture }
            onBlur={ handleBlur }
            name='picture'
            id='picture'
            placeholder='Ссылка на изображение'
            w={ 400 }
          />
          { touched.picture && errors.picture && <FormError>{ errors.picture }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <FormLabel mt={ 3 }>
        Описание:
        <FormInputContainer>
          <Textarea
            onChange={ handleChange }
            value={ values.description }
            onBlur={ handleBlur }
            name='description'
            id='description'
          />
          { touched.description && errors.description && <FormError>{ errors.description }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <Button type='submit' mt={ 3 } disabled={ isSubmitting }>
        { props.buttonText }
      </Button>
    </form>
  )
})
