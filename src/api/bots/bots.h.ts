import { BaseData } from 'api/base/base'

export interface BotData {
  owner: string
  title: string
  picture: string
  description: string
}

export type BotDataFull = BotData & BaseData
