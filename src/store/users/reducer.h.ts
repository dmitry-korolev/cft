import { UserDataFull } from 'api/users/users.h'

export interface UsersState {
  users: UserDataFull[]
  currentPageUrl: string
  nextPageUrl?: string
  previousPageUrl?: string
  isLoading?: boolean
  error?: any
}
