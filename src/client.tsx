// Polyfills
import e6p from 'es6-promise'
import 'isomorphic-fetch'

e6p.polyfill()

// Utils
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// App
import { App } from 'containers/App/App'
import { configureStore } from 'store/store'

const store = configureStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
)
