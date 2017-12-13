import Ajv from 'ajv'
import user from 'schemas/userSchema.json'

const ajv = new Ajv()
export const validateUser = ajv.compile(user)
