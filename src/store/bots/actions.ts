import { FormikBag } from 'formik'
import { createAction } from 'redux-act'

import { BotData, BotDataFull } from 'api/bots/bots.h'
import { AdiResponse } from 'models/api/responce'

export const reloadBotsCurrentPage = createAction('Reload current page')
export const loadBotsNextPage = createAction('LOAD MOAR BOTS PLS')
export const loadBotsPrevPage = createAction('Load previous portion of bots list')
export const loadBotsSuccess = createAction<AdiResponse<BotData>>('Bots loaded')
export const loadBotsFail = createAction<any>('Bots loading failed')
export const loadBot = createAction<string>('Load bot by id')
export const loadBotSuccess = createAction<BotDataFull>('Bot loaded')

export const saveBot = createAction<BotData, FormikBag<{}, BotData>>(
  'Save new bot',
  (values: BotData) => values,
  (_, bag: FormikBag<{}, BotData>) => bag
)

export interface UpdateBotMeta {
  bag: FormikBag<{}, BotDataFull>
  id: string
}
export const updateBot = createAction<BotData, UpdateBotMeta>(
  'Update bot',
  (values) => values,
  (_, bag, id: string) => ({
    bag,
    id
  })
)
