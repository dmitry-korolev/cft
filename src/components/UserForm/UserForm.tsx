import { withFormik } from 'formik'
import React from 'react'

// Components
import { omitBaseData } from 'api/utils/omitBaseData'
import { FormError, FormInputContainer, FormLabel } from 'components/Form/Form.s'
import { UserFormErrors, UserFormOwnProps, UserFormValues } from 'components/UserForm/UserForm.h'
import { Button, Input, Label, Radio } from 'rebass'

const enhance = withFormik<UserFormOwnProps, UserFormValues>({
  mapPropsToValues: (props) =>
    omitBaseData(props.initialValues) || {
      gender: null,
      name: '',
      email: '',
      dob: '',
      phone: '',
      avatarUrl: '',
      botIds: []
    },

  validate: (values: UserFormValues) => {
    const errors: UserFormErrors = {}
    if (!values.name) {
      errors.name = 'Пожалуйста, введите имя пользователя.'
    }
    if (!values.avatarUrl) {
      errors.avatarUrl = 'Пожалуйста, укажите ссылку на изображение.'
    }
    if (!values.email) {
      errors.email = 'Пожалуйста, укажите email.'
    }
    return errors
  },

  handleSubmit: (values, bag) => {
    bag.props.onSubmit(values, bag, bag.props.id)
  },

  displayName: 'UserForm'
})

export const UserForm = enhance((props) => {
  const { handleChange, handleBlur, handleSubmit, values, isSubmitting, touched, errors } = props

  return (
    <form onSubmit={ handleSubmit }>
      <FormLabel mt={ 3 }>
        Имя пользователя:
        <FormInputContainer>
          <Input
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.name }
            name='name'
            id='name'
            placeholder='Имя пользователя'
          />
          { touched.name && errors.name && <FormError>{ errors.name }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <FormLabel mt={ 3 }>
        Ссылка на изображение:
        <FormInputContainer>
          <Input
            onChange={ handleChange }
            value={ values.avatarUrl }
            onBlur={ handleBlur }
            name='avatarUrl'
            id='avatarUrl'
            placeholder='Ссылка на изображение'
          />
          { touched.avatarUrl && errors.avatarUrl && <FormError>{ errors.avatarUrl }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <FormLabel mt={ 3 }>
        Email:
        <FormInputContainer>
          <Input
            onChange={ handleChange }
            value={ values.email }
            onBlur={ handleBlur }
            name='email'
            id='email'
            placeholder='Ссылка на изображение'
          />
          { touched.email && errors.email && <FormError>{ errors.email }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <FormLabel mt={ 3 }>
        Номер телефона:
        <FormInputContainer>
          <Input
            onChange={ handleChange }
            value={ values.phone }
            onBlur={ handleBlur }
            name='phone'
            id='phone'
            placeholder='Ссылка на изображение'
          />
          { touched.phone && errors.phone && <FormError>{ errors.phone }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <FormLabel mt={ 3 }>
        Пол:
        <FormInputContainer>
          <Label>
            <Radio
              onChange={ handleChange }
              onBlur={ handleBlur }
              name='gender'
              id='gender'
              value='male'
              defaultChecked={ values.gender === 'male' }
            />
            Мужской
          </Label>
          <Label>
            <Radio
              onChange={ handleChange }
              onBlur={ handleBlur }
              name='gender'
              id='gender'
              value='female'
              defaultChecked={ values.gender === 'female' }
            />
            Женский
          </Label>
        </FormInputContainer>
      </FormLabel>
      <Button type='submit' mt={ 3 } disabled={ isSubmitting }>
        { props.buttonText }
      </Button>
    </form>
  )
})
