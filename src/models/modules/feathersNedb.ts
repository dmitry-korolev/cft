declare module 'feathers-nedb' {
  import { Application, NullableId, Pagination, Params } from 'feathers'
  import Nedb from 'nedb'

  export interface PaginationOptions {
    default: number
    max?: number
  }

  export interface ServiceOptions {
    Model: Nedb
    paginate?: PaginationOptions
  }

  export class Service<T> {
    constructor (options: ServiceOptions)
    find (params?: Params, callback?: any): Promise<T[] | Pagination<T>>
    get (id: number | string, params?: Params, callback?: any): Promise<T>
    create (data: T, params?: Params, callback?: any): Promise<T>
    update (id: NullableId, data: T, params?: Params, callback?: any): Promise<T>
    patch (id: NullableId, data: any, params?: Params, callback?: any): Promise<T>
    remove (id: NullableId, params?: Params, callback?: any): Promise<T>
  }
}
