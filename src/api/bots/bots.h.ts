import { BaseData } from 'api/base/base'

export interface BotData extends BaseData {
  owner: string
  title: string
  picture: string
  description: string
}
