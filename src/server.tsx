/* tslint:disable no-var-requires */
import debug from 'debug'
import express from 'express'
import favicon from 'serve-favicon'

// Node
import path from 'path'

import { matchCallback } from 'server/matchCallback'

const logInfo = debug('k:server:info')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackConfig = require('../config/webpack/client-dev')
  const webpackCompiler = webpack(webpackConfig)

  app.use(
    require('webpack-dev-middleware')(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true },
      noInfo: true,
      hot: true,
      inline: true,
      lazy: false,
      historyApiFallback: true,
      quiet: true
    })
  )

  app.use(require('webpack-hot-middleware')(webpackCompiler))
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('*', async (req, res) => {
  const { code, message } = await matchCallback(req.url)

  if (code === 301) {
    res.redirect(301, message)
  } else {
    res.send(message)
  }
})

app.listen(9000, () => logInfo('Listening on port :9000'))
