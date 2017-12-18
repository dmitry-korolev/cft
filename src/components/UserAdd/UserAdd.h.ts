import { saveUser } from 'store/users/actions'

export interface UserAddDispatchProps {
  saveUser: typeof saveUser
}
