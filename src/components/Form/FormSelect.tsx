import { compose, filter, map } from 'ramda'
import React, { SyntheticEvent } from 'react'

// Components
import { FormSelectContainer } from 'components/Form/FormSelect.s'

// Models
import { FormSelectProps } from 'components/Form/FormSelect.h'

const collectValues = compose<any, any, string[]>(
  map((option: any) => option.value),
  filter((option: any) => option.selected)
)
export const FormSelect = (props: FormSelectProps<any>) => {
  const { name, values, options, setFieldValue, ...otherProps } = props

  const handleChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    setFieldValue(name, collectValues(event.currentTarget.options))
  }
  return (
    <FormSelectContainer>
      <select name={ name } onChange={ handleChange } defaultValue={ values } { ...otherProps }>
        { options.map((option) => {
          return (
            <option key={ option.value } value={ option.value }>
              { option.label || option.value }
            </option>
          )
        }) }
      </select>
    </FormSelectContainer>
  )
}
