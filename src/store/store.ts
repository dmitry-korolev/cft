import { always } from 'ramda'
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux'
import { createLogger } from 'redux-logger'

// Models
import { State } from 'store/store.h'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

export function configureStore (initialState: State): Store<State> {
  const middlewares: Middleware[] = []

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

  const store = createStore(
    always({}),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      // store.replaceReducer((require('./reducers')))
      store.replaceReducer(always({}))
    })
  }

  return store
}
