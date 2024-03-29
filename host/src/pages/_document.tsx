import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import {LoadScripts} from '../../loader'


class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head >
          {/* {LoadScripts()} */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
