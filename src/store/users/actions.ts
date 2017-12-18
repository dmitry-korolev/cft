import { FormikBag } from 'formik'
import { createAction } from 'redux-act'

import { UserData, UserDataFull } from 'api/users/users.h'
import { ApiResponce } from 'models/api/responce'

export const reloadUsersCurrentPage = createAction('Reload current page')
export const loadUsersNextPage = createAction('Load more users')
export const loadUsersPrevPage = createAction('Load previous portion of users list')
export const loadUsersSuccess = createAction<ApiResponce<UserData>>('Users loaded')
export const loadUsersFail = createAction<any>('Users loading failed')
export const saveUser = createAction<UserData, FormikBag<{}, UserData>>(
  'Save new user',
  (values: UserData) => values,
  (_, bag: FormikBag<{}, UserData>) => bag
)

export interface UpdateUserMeta {
  bag: FormikBag<{}, UserDataFull>
  id: string
}
export const updateUser = createAction<UserData, UpdateUserMeta>(
  'Update user',
  (values) => values,
  (_, bag, id: string) => ({
    bag,
    id
  })
)
