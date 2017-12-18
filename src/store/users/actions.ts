import { FormikBag } from 'formik'
import { createAction } from 'redux-act'

import { UserData } from 'api/users/users.h'
import { AdiResponse } from 'models/api/responce'
import { UpdateUserMeta } from 'store/users/actions.h'

export const reloadUsersCurrentPage = createAction('Reload current page')
export const loadUsersNextPage = createAction('Load more users')
export const loadUsersPrevPage = createAction('Load previous portion of users list')
export const loadUsersSuccess = createAction<AdiResponse<UserData>>('Users loaded')
export const loadUsersFail = createAction<any>('Users loading failed')
export const loadUser = createAction<string>('Load user by id')
export const loadUserSuccess = createAction<UserData>('User loaded')
export const saveUser = createAction<UserData, FormikBag<{}, UserData>>(
  'Save new user',
  (values: UserData) => values,
  (_, bag: FormikBag<{}, UserData>) => bag
)

export const updateUser = createAction<UserData, UpdateUserMeta>(
  'Update user',
  (values) => values,
  (_, bag, id: string) => ({
    bag,
    id
  })
)
