import { BotDataFull } from 'api/bots/bots.h'

export interface BotsState {
  bots: BotDataFull[]
  currentPageUrl: string
  nextPageUrl?: string
  previousPageUrl?: string
  isLoading?: boolean
  error?: any
}
