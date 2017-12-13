import { Pagination } from 'feathers'

export const isPaginated = <T>(data: T[] | Pagination<T>): data is Pagination<T> => {
  return !Array.isArray(data) && Array.isArray(data.data)
}
