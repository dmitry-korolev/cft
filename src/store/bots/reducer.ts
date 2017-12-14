import { indexBy, merge, prop } from 'ramda'

// Actions
import { loadBotsNextPage, loadBotsSuccess } from 'store/bots/actions'

// Utils
import { botsServiceName } from 'api/bots/bots'
import { apiEndpoint } from 'api/utils/apiEndpoint'
import { createReducer } from 'redux-act'

// Models
import { BotDataFull } from 'api/bots/bots.h'
import { ApiResponce } from 'models/api/responce'
import { BotsState } from 'store/bots/reducer.h'

const initialState = {
  bots: {},
  nextPageUrl: apiEndpoint(botsServiceName)
}

const indexById = indexBy<BotDataFull>(prop('_id'))

export const botsReducer = createReducer<BotsState>(
  {
    [loadBotsNextPage.getType()]: (state) =>
      merge(state, {
        isLoading: true
      }),
    [loadBotsSuccess.getType()]: (_, payload: ApiResponce<BotDataFull>) => ({
      bots: indexById(payload.result),
      nextPageUrl: payload.nextPageUrl,
      previousPageUrl: payload.previousPageUrl,
      isLoading: false,
      error: null
    })
  },
  initialState
)
