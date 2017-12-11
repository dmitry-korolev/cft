import React from 'react'
import { Store } from 'redux'
import Helmet from 'react-helmet'

export const Html = (props: HtmlProps) => {
  const { markup, store, manifest } = props
  const head = Helmet.rewind()
  const renderScripts = <script src={ `/public/${manifest['app.js']}` } />

  const initialState = (
    <script
      dangerouslySetInnerHTML={ {
        __html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};`
      } }
      charSet='UTF-8'
    />
  )

  return (
    <html>
    <head>
      { head.base.toComponent() }
      { head.title.toComponent() }
      { head.meta.toComponent() }
      { head.link.toComponent() }
      { head.script.toComponent() }
      <link rel='shortcut icon' href='/favicon.ico'/>
    </head>
    <body>
    <main
      id='app'
      dangerouslySetInnerHTML={ { __html: markup } }
    />
    { initialState }
    { renderScripts }
    </body>
    </html>
  )
}

interface HtmlProps {
  manifest: { [K: string]: string }
  markup: string
  store: Store<{}>
}
