import { merge } from 'ramda'

// Actions
import {
  loadUser,
  loadUsersFail,
  loadUsersNextPage,
  loadUsersPrevPage,
  loadUsersSuccess,
  loadUserSuccess,
  reloadUsersCurrentPage,
  saveUser,
  updateUser
} from 'store/users/actions'

// Utils
import { createReducer } from 'redux-act'

// Models
import { UserData, UserDataFull } from 'api/users/users.h'
import { AdiResponse } from 'models/api/responce'
import { UpdateUserMeta } from 'store/users/actions.h'
import { UsersState } from 'store/users/reducer.h'

const initialState = {
  users: [],
  currentPageUrl: ''
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
    [loadUsersSuccess.getType()]: (state, payload: AdiResponse<UserDataFull>) => ({
      users: payload.result,
      currentPageUrl: state.currentPageUrl,
      nextPageUrl: payload.nextPageUrl,
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
      }),
    [loadUser.getType()]: (state) =>
      merge(state, {
        isLoading: true
      }),
    [loadUserSuccess.getType()]: (state, payload: UserData) =>
      merge(state, {
        users: [payload, ...state.users],
        isLoading: false
      })
  },
  initialState
)
