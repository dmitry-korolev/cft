import { BaseData } from '../base/base'

export interface UserData {
  gender: null | 'male' | 'female' // Пока остановимся на двух.
  name: string
  email: string
  dob: string
  phone: string
  avatarUrl: string
  botIds: string[]
}

export type UserDataFull = UserData & BaseData
