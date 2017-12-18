// Utils
import { usersServiceName } from 'api/users/users'
import { apiEndpoint } from 'api/utils/apiEndpoint'
import { fromPromise, merge, of } from 'most'
import { combineEpics, select } from 'redux-most'

// Actions
import {
  loadUsersFail,
  loadUsersNextPage,
  loadUsersSuccess,
  reloadUsersCurrentPage,
  saveUser,
  updateUser,
  UpdateUserMeta
} from 'store/users/actions'

// Models
import { UserData, UserDataFull } from 'api/users/users.h'
import { FormikBag } from 'formik'
import { ApiResponce } from 'models/api/responce'
import { Action } from 'redux-act'
import { Epic } from 'store/store.h'

const reloadCurrentUsers: Epic = (action$, store) =>
  action$.thru(select(reloadUsersCurrentPage.getType())).chain(() => {
    return fromPromise(
      fetch(store.getState().users.currentPageUrl).then(async (result) => result.json())
    )
      .map((result: ApiResponce<UserData>) => loadUsersSuccess(result))
      .recoverWith((error) => of(loadUsersFail(error)))
  })

const loadNextUsersEpic: Epic = (action$, store) =>
  action$
    .filter(() => !!store.getState().users.nextPageUrl)
    .thru(select(loadUsersNextPage.getType()))
    .chain(() => {
      return fromPromise(
        fetch(store.getState().users.nextPageUrl!).then(async (result) => result.json())
      )
        .map((result: ApiResponce<UserData>) => loadUsersSuccess(result))
        .recoverWith((error) => of(loadUsersFail(error)))
    })

const loadPrevUsersEpic: Epic = (action$, store) =>
  action$
    .filter(() => !!store.getState().users.previousPageUrl)
    .thru(select(loadUsersNextPage.getType()))
    .chain(() => {
      return fromPromise(
        fetch(store.getState().users.previousPageUrl!).then(async (result) => result.json())
      )
        .map((result: ApiResponce<UserData>) => loadUsersSuccess(result))
        .recoverWith((error) => of(loadUsersFail(error)))
    })

const saveUserEpic: Epic = (action$) =>
  action$
    .thru(select(saveUser.getType()))
    .chain(({ payload, meta }: Action<UserData, FormikBag<{}, UserData>>) => {
      return fromPromise(
        fetch(apiEndpoint(usersServiceName), {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
      )
        .map<Action<any, any>>(() => {
          meta!.resetForm()

          return reloadUsersCurrentPage()
        })
        .recoverWith((error) => {
          meta!.setSubmitting(false)

          return of(loadUsersFail(error))
        })
    })

const updateUserEpic: Epic = (action$) =>
  action$
    .thru(select(updateUser.getType()))
    .chain(({ payload, meta }: Action<UserDataFull, UpdateUserMeta>) => {
      return fromPromise(
        fetch(`${apiEndpoint(usersServiceName)}/${meta!.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
      )
        .map<Action<any, any>>(() => {
          meta!.bag.resetForm()

          return reloadUsersCurrentPage()
        })
        .recoverWith((error) => {
          meta!.bag.setSubmitting(false)

          return merge<any>(of(loadUsersFail(error)), of(reloadUsersCurrentPage()))
        })
    })

// В общем, для TS redux-most в продакшн пока не катит, тайпинги отбитые просто
export const usersEpic = combineEpics([
  reloadCurrentUsers as any,
  loadNextUsersEpic as any,
  loadPrevUsersEpic as any,
  saveUserEpic as any,
  updateUserEpic as any
])
