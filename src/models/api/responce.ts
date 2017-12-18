export interface AdiResponse<T> {
  result: T[]
  previousPageUrl?: string
  nextPageUrl?: string
}
