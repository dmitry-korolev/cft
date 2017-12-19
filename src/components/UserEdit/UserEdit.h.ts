// Actions
import { loadUser, updateUser } from 'store/users/actions'

// Models
import { UserDataFull } from 'api/users/users.h'
import { NavigationProps } from 'containers/App/App.h'
import { RouteComponentProps } from 'react-router'

export interface UserEditDispatchProps {
  updateUser: typeof updateUser
  loadUser: typeof loadUser
}

interface UserEditStateProps {
  user?: UserDataFull
  userId: string
  error?: any
  isLoading?: boolean
}

export type UserEditProps = UserEditDispatchProps &
  UserEditStateProps &
  RouteComponentProps<NavigationProps>
