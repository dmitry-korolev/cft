import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// App
import { App } from './containers/App/App'
import { configureStore } from './store/store'

declare global {
  interface Window {
    __INITIAL_STATE__: string
  }
}

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider store={ configureStore(JSON.parse(window.__INITIAL_STATE__)) }>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
)
