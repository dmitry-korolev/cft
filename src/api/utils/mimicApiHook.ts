// Utils
import q from 'query-string'
import { merge, omit } from 'ramda'
import { removeEmptyFields } from 'utils/removeEmptyFields'

// Models
import { HookMap } from 'feathers-hooks'

const getNextPage = (total: number, limit: number, skip: number, query: object): string | void => {
  if (skip + limit < total) {
    return q.stringify(
      merge(query, {
        $skip: skip + limit
      })
    )
  }
}

const getPrevPageUrl = (limit: number, skip: number, query: object): string | void => {
  const prev = skip - limit

  if (prev === 0) {
    return q.stringify(omit(['$skip'], query))
  }
  if (prev > 0) {
    return q.stringify(
      merge(query, {
        $skip: prev
      })
    )
  }
}

export const mimicApiHook = (): HookMap => {
  return {
    find: (hook: any) => {
      const { data, total, limit, skip } = hook.result
      const { query } = hook.params

      hook.result = removeEmptyFields({
        result: data,
        previousPageUrl: getPrevPageUrl(limit, skip, query),
        nextPageUrl: getNextPage(total, limit, skip, query)
      })
    },
    get: (hook: any) => {
      hook.result = {
        result: hook.result
      }
    }
  }
}
