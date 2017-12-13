import React, { ReactElement } from 'react'
import Helmet from 'react-helmet'

export const Html = (props: HtmlProps) => {
  const { markup, manifest, styleTags } = props
  const head = Helmet.rewind()
  const renderScripts = <script src={ `/public/${manifest['app.js']}` } />

  return (
    <html>
      <head>
        { head.base.toComponent() }
        { head.title.toComponent() }
        { head.meta.toComponent() }
        { head.link.toComponent() }
        { head.script.toComponent() }
        <link rel='shortcut icon' href='/favicon.ico' />
        { styleTags }
      </head>
      <body>
        <main id='app' dangerouslySetInnerHTML={ { __html: markup } } />
        { renderScripts }
      </body>
    </html>
  )
}

interface HtmlProps {
  manifest: { [K: string]: string }
  markup: string
  styleTags: Array<ReactElement<any>>
}
