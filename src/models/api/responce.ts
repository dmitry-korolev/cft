export interface ApiResponce<T> {
  result: T[]
  previousPageUrl?: string
  nextPageUrl?: string
}
