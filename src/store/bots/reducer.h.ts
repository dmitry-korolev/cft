import { BotDataFull } from 'api/bots/bots.h'

export interface BotsState {
  bots: BotDataFull[]
  nextPageUrl: string
  previousPageUrl?: string
  isLoading?: boolean
  error?: any
}
