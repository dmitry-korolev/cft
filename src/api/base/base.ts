import debug from 'debug'
import { Unprocessable } from 'feathers-errors'
import { Service, ServiceOptions } from 'feathers-nedb'

// Utils
import { omitBaseData } from 'api/utils/omitBaseData'
import { assocPath, lens, merge, path, set, T, view } from 'ramda'

// Models
import { ValidateFunction } from 'ajv/lib/ajv'
import IDebugger = debug.IDebugger
import { Params } from 'feathers'

interface CreateServiceOptions extends ServiceOptions {
  serviceName: string
  incremental?: boolean
  validator?: ValidateFunction
}

export interface BaseData {
  createdAt: Date
  updatedAt: Date
  _id: string
}

const sortL = lens(path(['query', '$sort']), assocPath(['query', '$sort']))
const viewSort = view(sortL)
const setSort = set(sortL, {
  createdAt: '-1'
})

export class BaseService<Type extends BaseData> extends Service<Type> {
  protected serviceName: string
  protected incremental: boolean

  private logInfo: IDebugger
  private validator: ValidateFunction

  constructor (config: CreateServiceOptions) {
    const { serviceName, validator = T, incremental = false, paginate, Model } = config
    super({ Model, paginate })

    this.serviceName = serviceName
    this.validator = validator
    this.incremental = incremental

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

    this.logInfo('POST', data, params)

    // Any is OK here
    return super.create(data, params)
  }

  async update (id: string, data: Partial<Type>, params?: Params) {
    const entity = await super.get(id, params)
    const newData = omitBaseData(merge(entity, data))
    const valid = this.validator(newData)

    if (!valid) {
      throw new Unprocessable('Check data!', this.validator.errors)
    }

    this.logInfo('PUT', id, newData, params)
    return super.update(id, newData, params)
  }

  async patch (id: string, data: Partial<Type>, params?: Params) {
    return this.update(id, data, params)
  }

  async remove (id: number, params?: Params) {
    this.logInfo('DELETE', id, params)
    return super.remove(id, params)
  }
}
