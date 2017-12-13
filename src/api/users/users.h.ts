import { BaseData } from '../base/base'

export enum UserLevel {
  USER = 0,
  ADMIN = 50
}

export interface UserData extends BaseData {
  gender: string
  name: {
    first: string
    last: string
  }
  location: {
    street: string
    city: string
    state: string
    postcode: string
  }
  email: string
  username: string
  dob: string
  phone: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  level: UserLevel
  botId: string
}
