import { indexBy, prop } from 'ramda'
import { createSelector } from 'reselect'

// Models
import { BotDataFull } from 'api/bots/bots.h'
import { State } from 'store/store.h'

export const botByIdsSelector = createSelector<State, BotDataFull[], { [K: string]: BotDataFull }>(
  (state) => state.bots.bots,
  indexBy(prop('_id'))
)
