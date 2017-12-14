import { combineReducers } from 'redux'

// Reducers
import { botsReducer } from 'store/bots/reducer'

// Models
import { State } from 'store/store.h'

export const rootReducer = combineReducers<State>({
  bots: botsReducer as any
})
