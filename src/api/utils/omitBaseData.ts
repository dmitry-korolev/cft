import { omit } from 'ramda'

export const omitBaseData = omit(['_id', 'createdAt', 'updatedAt'])
