import { BaseData } from 'api/base/base'

export interface BotData {
  title: string
  picture: string
  description: string
}

export type BotDataFull = BotData & BaseData
