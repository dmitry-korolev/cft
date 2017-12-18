import { merge } from 'ramda'

// Actions
import {
  loadUsersFail,
  loadUsersNextPage,
  loadUsersPrevPage,
  loadUsersSuccess,
  reloadUsersCurrentPage,
  saveUser,
  updateUser,
  UpdateUserMeta
} from 'store/users/actions'

// Utils
import { usersServiceName } from 'api/users/users'
import { apiEndpoint } from 'api/utils/apiEndpoint'
import { createReducer } from 'redux-act'

// Models
import { UserData, UserDataFull } from 'api/users/users.h'
import { ApiResponce } from 'models/api/responce'
import { UsersState } from 'store/users/reducer.h'

const initialState = {
  users: [],
  currentPageUrl: apiEndpoint(usersServiceName)
}

export const usersReducer = createReducer<UsersState>(
  {
    [reloadUsersCurrentPage.getType()]: (state) =>
      merge(state, {
        isLoading: true
      }),
    [loadUsersNextPage.getType()]: (state) =>
      merge(state, {
        currentPageUrl: state.nextPageUrl!,
        isLoading: true
      }),
    [loadUsersPrevPage.getType()]: (state) =>
      merge(state, {
        currentPageUrl: state.previousPageUrl!,
        isLoading: true
      }),
    [loadUsersSuccess.getType()]: (state, payload: ApiResponce<UserDataFull>) => ({
      users: payload.result,
      currentPageUrl: state.currentPageUrl,
      nextPageUrl: payload.nextPageUrl || state.nextPageUrl,
      previousPageUrl: payload.previousPageUrl,
      isLoading: false,
      error: null
    }),
    [loadUsersFail.getType()]: (state, error: any) =>
      merge(state, {
        isLoading: false,
        error
      }),
    [saveUser.getType()]: (state, payload: UserData) =>
      merge(state, {
        users: [payload, ...state.users],
        isLoading: true
      }),
    [updateUser.getType()]: (state, payload: UserData, meta: UpdateUserMeta) =>
      merge(state, {
        users: state.users.map((user) => {
          if (user._id === meta.id) {
            return merge(user, payload)
          }

          return user
        }),
        isLoading: true
      })
  },
  initialState
)
