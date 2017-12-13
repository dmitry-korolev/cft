import debug from 'debug'
import React, { ReactElement } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { ServerStyleSheet } from 'styled-components'

import { configureStore } from 'store/store'

// Components
import { App } from '../containers/App/App'
import { Html } from '../containers/Html/Html'

// Static
import manifest from '../../build/manifest.json'

interface MatchCallbackResult {
  code: 301 | 200
  message: string
}

interface RouterContext {
  url?: string
}

export const matchCallback = async (url: string): Promise<MatchCallbackResult> => {
  const context: RouterContext = {}
  const store = configureStore()
  const sheet = new ServerStyleSheet()

  const markup = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={ url } context={ context }>
        <Provider store={ store }>
          <App />
        </Provider>
      </StaticRouter>
    )
  )

  if (context.url) {
    return {
      code: 301,
      message: context.url
    }
  } else {
    const styleTags = sheet.getStyleElement()

    debug('cft:html')(styleTags)

    return {
      code: 200,
      message: renderHTML(markup, styleTags)
    }
  }
}

function renderHTML (markup: string, styleTags: Array<ReactElement<any>>): string {
  const html = ReactDOMServer.renderToString(
    <Html markup={ markup } manifest={ manifest } styleTags={ styleTags } />
  )

  return `<!doctype html> ${html}`
}
