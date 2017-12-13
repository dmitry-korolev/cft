import debug from 'debug'
import { Unprocessable } from 'feathers-errors'
import { Service, ServiceOptions } from 'feathers-nedb'

import { assocPath, lens, merge, path, set, T, view } from 'ramda'

// Models
import { ValidateFunction } from 'ajv/lib/ajv'
import IDebugger = debug.IDebugger
import { Application, Params } from 'feathers'

interface CreateServiceOptions extends ServiceOptions {
  serviceName: string
  incremental?: boolean
  validator?: ValidateFunction
}

export interface BaseData {
  _created?: Date
  id?: number
}

const sortL = lens(path(['query', '$sort']), assocPath(['query', '$sort']))
const viewSort = view(sortL)
const setSort = set(sortL, {
  _created: -1
})

export class BaseService<Type extends BaseData> extends Service<Type> {
  protected optionsService: any
  protected serviceName: string

  private logInfo: IDebugger
  private incremental: boolean
  private validator: ValidateFunction

  constructor (config: CreateServiceOptions) {
    const { serviceName, incremental = false, validator = T, paginate, Model } = config
    super({ Model, paginate })

    this.serviceName = serviceName
    this.incremental = incremental
    this.validator = validator

    this.logInfo = debug(`cft:db:${serviceName}:info`)
  }

  async find (params: Params = {}) {
    if (this.incremental && !viewSort(params)) {
      params = setSort(params)
    }

    this.logInfo('FIND', params)

    return super.find(params)
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
