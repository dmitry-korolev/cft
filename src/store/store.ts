import { Middleware, Store, applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { always } from 'ramda'
// Models
import { State } from 'store/store.model'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

export function configureStore (): Store<State> {
  const middlewares: Middleware[] = []

  /** Add Only Dev. Middlewares */
  if (process.env.NODE_ENV !== 'production' && process.env.BROWSER) {
    const logger = createLogger({
      collapsed: true,
      duration: true,
      diff: true
    })
    middlewares.push(logger)
  }

  const composeEnhancers = (process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const store = createStore(always({}), {}, composeEnhancers(
    applyMiddleware(...middlewares)
  ))

  if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      // store.replaceReducer((require('./reducers')))
      store.replaceReducer(always({}))
    })
  }

  return store
}
