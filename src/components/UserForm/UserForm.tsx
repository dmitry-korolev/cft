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
      location: {
        street: '',
        city: '',
        state: '',
        postcode: ''
      },
      email: '',
      username: '',
      dob: '',
      phone: '',
      avatarUrl: '',
      level: 0,
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
            w={ 400 }
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
            w={ 400 }
          />
          { touched.avatarUrl && errors.avatarUrl && <FormError>{ errors.avatarUrl }</FormError> }
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
          { touched.avatarUrl && errors.avatarUrl && <FormError>{ errors.avatarUrl }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <Button type='submit' mt={ 3 } disabled={ isSubmitting }>
        { props.buttonText }
      </Button>
    </form>
  )
})
