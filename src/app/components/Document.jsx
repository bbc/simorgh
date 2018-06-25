import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import { ServerStyleSheet } from 'styled-components';
// import requirejs from 'requirejs';

class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = await renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { assets, data, ...page, styleTags };
  }

  render() {
    const { helmet, assets, data, styleTags } = this.props; // eslint-disable-line react/prop-types
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    // const requireMap = {
    //   'jquery-1.9': '../vendor/jquery-1.9.1',
    //   'bump-3': '../vendor/bump-3',
    // };

    return (
      <html lang="en-GB" {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="nofollow" />
          <link rel="manifest" href="manifest.json" />
          {helmet.title.toComponent()}
          {styleTags}
          {/* <script type="text/javascript">
            {requirejs.config({ paths: requireMap, waitSeconds: 30 })}
          </script> */}
        </head>
        <body>
          <AfterRoot />
          <AfterData data={data} />
          <script type="text/javascript" src={assets.client.js} defer />
        </body>
      </html>
    );
  }
}

export default Document;
