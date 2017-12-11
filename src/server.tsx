import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import favicon from 'serve-favicon'

// Node
import path from 'path'

import manifest from '../build/manifest.json'

// App
import { App } from './containers/App/App'
import { Html } from './containers/Html/Html'
import { configureStore } from './store/store'

const app = express()

interface RouterContext {
  url?: string
}

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackConfig = require('../config/webpack/client-dev')
  const webpackCompiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    quiet: true
  }))

  app.use(require('webpack-hot-middleware')(webpackCompiler))
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  const context: RouterContext = {}
  const markup = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App/>
    </StaticRouter>
  )

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    res.redirect(301, context.url)
  } else {
    res.send(renderHTML(markup, configureStore()))
  }
})

function renderHTML (markup: string, store: any): string {
  const html = ReactDOMServer.renderToString(
    <Html markup={ markup } manifest={ manifest } store={ store }/>
  )

  return `<!doctype html> ${html}`
}

app.listen(9000)
