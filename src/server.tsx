/* tslint:disable no-var-requires */
import debug from 'debug'
import e6p from 'es6-promise'
import 'isomorphic-fetch'

e6p.polyfill()

// Server
import bodyParser from 'body-parser'
import compression from 'compression'
import feathers from 'feathers'
import errorsHandler from 'feathers-errors/handler'
import hooks from 'feathers-hooks'
import rest from 'feathers-rest'

// Node
import path from 'path'
import favicon from 'serve-favicon'

// Utils
import { setupApplication } from 'api/setup'
import { matchCallback } from 'server/matchCallback'

const logInfo = debug('cft:server:info')
const app = feathers()

app.configure(hooks())
app.configure(rest())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())

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
app.use('/public', feathers.static(path.join(__dirname, 'public')))

setupApplication(app)
app.use(errorsHandler())

app.get('*', async (req, res) => {
  const { code, message } = await matchCallback(req.url)

  if (code === 301) {
    res.redirect(301, message)
  } else {
    res.send(message)
  }
})

app.listen(9000, () => logInfo('Listening on port :9000'))
