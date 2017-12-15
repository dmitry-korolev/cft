import { merge } from 'ramda'

// Actions
import {
  loadBotsFail,
  loadBotsNextPage,
  loadBotsPrevPage,
  loadBotsSuccess
} from 'store/bots/actions'

// Utils
import { botsServiceName } from 'api/bots/bots'
import { apiEndpoint } from 'api/utils/apiEndpoint'
import { createReducer } from 'redux-act'

// Models
import { BotDataFull } from 'api/bots/bots.h'
import { ApiResponce } from 'models/api/responce'
import { BotsState } from 'store/bots/reducer.h'

const initialState = {
  bots: [],
  nextPageUrl: apiEndpoint(botsServiceName)
}

export const botsReducer = createReducer<BotsState>(
  {
    [loadBotsNextPage.getType()]: (state) =>
      merge(state, {
        isLoading: true
      }),
    [loadBotsPrevPage.getType()]: (state) =>
      merge(state, {
        isLoading: true
      }),
    [loadBotsSuccess.getType()]: (state, payload: ApiResponce<BotDataFull>) => ({
      bots: payload.result,
      nextPageUrl: payload.nextPageUrl || state.nextPageUrl,
      previousPageUrl: payload.previousPageUrl,
      isLoading: false,
      error: null
    }),
    [loadBotsFail.getType()]: (state, error: any) =>
      merge(state, {
        isLoading: false,
        error
      })
  },
  initialState
)
