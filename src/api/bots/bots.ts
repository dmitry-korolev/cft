import NeDB from 'nedb'

// Utils
import { BaseService } from 'api/base/base'
import { dbPath } from 'api/utils/dbPath'
import { mimicApiHook } from 'api/utils/mimicApiHook'

// Models
import { BotData } from 'api/bots/bots.h'

export const botsServiceName = 'bots'

const db: NeDB = new NeDB({
  filename: dbPath(botsServiceName),
  autoload: true
})

class BotsService extends BaseService<BotData> {
  after = mimicApiHook()
}

export const botsService = (): any =>
  new BotsService({
    paginate: {
      default: 50,
      max: 50
    },
    serviceName: botsServiceName,
    Model: db
  })
