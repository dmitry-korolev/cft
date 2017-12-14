// Utils
import { fromPromise, of, Stream } from 'most'
import { combineEpics, select } from 'redux-most'

// Actions
import { loadBotsFail, loadBotsNextPage, loadBotsSuccess } from 'store/bots/actions'

// Models
import { BotData } from 'api/bots/bots.h'
import { ApiResponce } from 'models/api/responce'
import { Action } from 'redux'

// Any, because redux-most typings are conflicting with each other
const loadNextBotsEpic = (action$: Stream<Action>, store: any) =>
  action$.thru(select(loadBotsNextPage.getType())).chain(() => {
    return fromPromise(fetch(store.getState().bots.nextPageUrl).then(async (result) => result.json()))
      .map((result: ApiResponce<BotData>) => loadBotsSuccess(result))
      .recoverWith((error) => of(loadBotsFail(error)))
  })

export const botsEpic = combineEpics([loadNextBotsEpic])
