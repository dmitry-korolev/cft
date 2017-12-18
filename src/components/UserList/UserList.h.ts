import { loadUsersNextPage, loadUsersPrevPage } from 'store/users/actions'

import { UsersState } from 'store/users/reducer.h'

interface UserListDispatchProps {
  loadUsersNextPage: typeof loadUsersNextPage
  loadUsersPrevPage: typeof loadUsersPrevPage
}

export type UserListProps = UsersState & UserListDispatchProps
