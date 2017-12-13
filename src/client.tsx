import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// App
import { App } from 'containers/App/App'
import { configureStore } from 'store/store'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ configureStore() }>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
)
