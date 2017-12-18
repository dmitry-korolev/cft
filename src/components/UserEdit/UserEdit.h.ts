// Actions
import { updateUser } from 'store/users/actions'

// Models
import { UserDataFull } from 'api/users/users.h'
import { NavigationProps } from 'containers/App/App.h'
import { RouteComponentProps } from 'react-router'

export interface UserEditDispatchProps {
  updateUser: typeof updateUser
}

interface UserEditStateProps {
  user?: UserDataFull
}

export type UserEditProps = UserEditDispatchProps &
  UserEditStateProps &
  RouteComponentProps<NavigationProps>
