// Utils
import { omitBaseData } from 'api/utils/omitBaseData'
import { withFormik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { dispatchWillMount } from 'utils/hoc/dispatchWillMount/dispatchWillMount'

// Actions
import { reloadBotsCurrentPage } from 'store/bots/actions'

// Components
import { FormError, FormInputContainer, FormLabel } from 'components/Form/Form.s'
import { FormSelect } from 'components/Form/FormSelect'
import { Button, Input, Label, Radio } from 'rebass'

// Models
import {
  UserFormErrors,
  UserFormOwnProps,
  UserFormProps,
  UserFormStateProps,
  UserFormValues
} from 'components/UserForm/UserForm.h'
import { State } from 'store/store.h'

const connectToState = connect<UserFormStateProps, {}, UserFormOwnProps, State>((state) => ({
  bots: state.bots.bots
}))
const addFormik = withFormik<UserFormOwnProps, UserFormValues>({
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
    if (!values.phone) {
      errors.phone = 'Пожалуйста, укажите номер телефона.'
    }
    return errors
  },

  handleSubmit: (values, bag) => {
    bag.props.onSubmit(values, bag, bag.props.id)
  },

  displayName: 'UserForm'
})
const enhance = compose<UserFormProps, UserFormOwnProps>(
  connectToState,
  dispatchWillMount([reloadBotsCurrentPage()]),
  addFormik
)

export const UserForm = enhance((props) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    isSubmitting,
    touched,
    errors,
    setFieldValue,
    bots
  } = props

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
            placeholder='Email'
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
            placeholder='Номер телефона'
          />
          { touched.phone && errors.phone && <FormError>{ errors.phone }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <FormLabel mt={ 3 }>
        Боты пользователя:
        <FormInputContainer>
          <FormSelect
            multiple
            name='botIds'
            id='botIds'
            values={ values.botIds }
            setFieldValue={ setFieldValue }
            onBlur={ handleBlur }
            options={ bots.map((bot) => ({
              value: bot._id,
              label: bot.title
            })) }
          />
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
