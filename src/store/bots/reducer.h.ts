import { BotData } from 'api/bots/bots.h'

export interface BotsState {
  bots: {
    [K: string]: BotData
  }
  nextPageUrl?: string
  previousPageUrl?: string
  isLoading?: boolean
  error?: any
}
