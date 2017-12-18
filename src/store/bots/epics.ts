// Utils
import { botsServiceName } from 'api/bots/bots'
import { apiEndpoint } from 'api/utils/apiEndpoint'
import { fromPromise, merge, of } from 'most'
import { combineEpics, select } from 'redux-most'

// Actions
import {
  loadBotsFail,
  loadBotsNextPage,
  loadBotsSuccess,
  saveBot,
  updateBot,
  UpdateBotMeta
} from 'store/bots/actions'

// Models
import { BotData, BotDataFull } from 'api/bots/bots.h'
import { FormikBag } from 'formik'
import { ApiResponce } from 'models/api/responce'
import { Action } from 'redux-act'
import { Epic } from 'store/store.h'

const loadNextBotsEpic: Epic = (action$, store) =>
  action$.thru(select(loadBotsNextPage.getType())).chain(() => {
    return fromPromise(fetch(store.getState().bots.nextPageUrl).then(async (result) => result.json()))
      .map((result: ApiResponce<BotData>) => loadBotsSuccess(result))
      .recoverWith((error) => of(loadBotsFail(error)))
  })

const saveBotEpic: Epic = (action$) =>
  action$
    .thru(select(saveBot.getType()))
    .chain(({ payload, meta }: Action<BotData, FormikBag<{}, BotData>>) => {
      return fromPromise(
        fetch(apiEndpoint(botsServiceName), {
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
          meta!.setSubmitting(false)

          return loadBotsNextPage()
        })
        .recoverWith((error) => {
          meta!.setSubmitting(false)

          return of(loadBotsFail(error))
        })
    })

const updateBotEpic: Epic = (action$) =>
  action$
    .thru(select(updateBot.getType()))
    .chain(({ payload, meta }: Action<BotDataFull, UpdateBotMeta>) => {
      return fromPromise(
        fetch(`${apiEndpoint(botsServiceName)}/${meta!.id}`, {
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

          return loadBotsNextPage()
        })
        .recoverWith((error) => {
          meta!.bag.setSubmitting(false)

          return merge<any>(of(loadBotsFail(error)), of(loadBotsNextPage()))
        })
    })

// В общем, для TS redux-most в продакшн пока не катит, тайпинги отбитые просто
export const botsEpic = combineEpics([
  loadNextBotsEpic as any,
  saveBotEpic as any,
  updateBotEpic as any
])
