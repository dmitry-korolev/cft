import debug from 'debug'
import { Unprocessable } from 'feathers-errors'
import { Service, ServiceOptions } from 'feathers-nedb'

// Utils
// import { isPaginated } from 'api/utils/isPaginated'
import { merge, T } from 'ramda'

// Models
import { ValidateFunction } from 'ajv/lib/ajv'
import IDebugger = debug.IDebugger
import { Application, Params } from 'feathers'

interface CreateServiceOptions extends ServiceOptions {
  serviceName: string
  validator?: ValidateFunction
}

export interface BaseData {
  _created?: Date
  id?: number
}

export class BaseService<Type extends BaseData> extends Service<Type> {
  protected optionsService: any
  protected serviceName: string

  private logInfo: IDebugger
  private validator: ValidateFunction

  constructor (config: CreateServiceOptions) {
    const { serviceName, validator = T, paginate, Model } = config
    super({ Model, paginate })

    this.serviceName = serviceName
    this.validator = validator

    this.logInfo = debug(`cft:db:${serviceName}:info`)
  }

  async find (params: Params = {}) {
    this.logInfo('FIND', params)
    const result = await super.find(params)

    // if (isPaginated(result)) {
    //   return ['asd', 'sads']
    // }

    return result
  }

  async get (id: string, params?: Params) {
    this.logInfo('GET', id, params)
    return super.get(id, params)
  }

  async create (data: Type, params?: Params) {
    const valid = this.validator(data)

    if (!valid) {
      throw new Unprocessable('Check data!', this.validator.errors)
    }

    data._created = new Date()
    this.logInfo('POST', data, params)

    // Any is OK here
    return super.create(data, params)
  }

  async update (id: string, data: any, params?: Params) {
    const entity = await this.get(id, params)
    const valid = this.validator(merge(entity, data))

    if (!valid) {
      throw new Unprocessable('Check data!', this.validator.errors)
    }

    data._updated = new Date()
    this.logInfo('PUT', id, data, params)
    return super.update(id, data, params)
  }

  async patch (id: string, data: any, params?: Params) {
    const entity = await this.get(id, params)
    const valid = this.validator(merge(entity, data))

    if (!valid) {
      throw new Unprocessable('Check data!', this.validator.errors)
    }

    this.logInfo('PATCH', id, data, params)
    return super.patch(id, data, params)
  }

  async remove (id: number, params?: Params) {
    this.logInfo('DELETE', id, params)
    return super.remove(id, params)
  }

  setup (app: Application, _path: string): void {
    this.optionsService = app.service('/api/options')
  }
}
