import { BaseData } from '../base/base'

export interface UserData {
  gender: null | 'male' | 'female' // Пока остановимся на двух.
  name: string
  location: {
    street: string
    city: string
    state: string
    postcode: string
  }
  email: string
  dob: string
  phone: string
  avatarUrl: string
  botIds: string[]
}

export type UserDataFull = UserData & BaseData
