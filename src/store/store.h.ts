import { Stream } from 'most'
import { MiddlewareAPI } from 'redux'
import { Action } from 'redux-act'
import { BotsState } from 'store/bots/reducer.h'
import { UsersState } from 'store/users/reducer.h'

export interface State {
  bots: BotsState
  users: UsersState
}

export type Epic = (
  action$: Stream<Action<any, any>>,
  store: MiddlewareAPI<State>
) => Stream<Action<any, any>>
