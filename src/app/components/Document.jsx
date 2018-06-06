import PropTypes from 'prop-types';
import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';

class Document extends React.Component {
  static propTypes = {
    helmet: PropTypes.objectOf(PropTypes.any).isRequired,
    assets: PropTypes.objectOf(PropTypes.any).isRequired,
    data: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    data: {},
  };

  static async getInitialProps({ assets, data, renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = await renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { assets, data, ...page };
  }

  render() {
    const { helmet, assets, data, styleTags } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();

    return (
      <html lang="en-GB" {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {styleTags}
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
