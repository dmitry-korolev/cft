import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-most'

import { rootEpic } from 'store/root/epic'
import { rootReducer } from 'store/root/reducers'

// Models
import { State } from 'store/store.h'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

export function configureStore (): Store<State> {
  const epicMiddleware = createEpicMiddleware(rootEpic)
  const middlewares: Middleware[] = [epicMiddleware]

  /* Add Only Dev. Middlewares */
  if (process.env.NODE_ENV !== 'production' && process.env.BROWSER) {
    const logger = createLogger({
      collapsed: true,
      duration: true,
      diff: true
    })
    middlewares.push(logger)
  }

  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' &&
      // tslint:disable-next-line strict-type-predicates
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose

  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))
}
