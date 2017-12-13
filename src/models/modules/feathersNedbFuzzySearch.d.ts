declare module 'feathers-nedb-fuzzy-search' {
  import { Hook } from 'feathers-hooks'

  const search: (
    config?: {
      fields?: string[]
      deep?: boolean
    }
  ) => Hook

  export default search
}
