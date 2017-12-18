import { combineReducers } from 'redux'

// Reducers
import { botsReducer } from 'store/bots/reducer'
import { usersReducer } from 'store/users/reducer'

// Models
import { State } from 'store/store.h'

export const rootReducer = combineReducers<State>({
  bots: botsReducer as any,
  users: usersReducer as any
})
