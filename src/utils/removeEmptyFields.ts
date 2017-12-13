import { complement, filter, isNil } from 'ramda'

export const removeEmptyFields: <T = object | any[]>(list: T) => T = filter(complement(isNil))
