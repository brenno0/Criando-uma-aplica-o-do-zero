import Document, { Html, Head,Main, NextScript, } from 'next/document';
import React from 'react';
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <title></title>
          <link
          rel="preconnect"
          href="https://fonts.gstatic.com" />
          <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
