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
    const page = await renderPage();
    return { assets, data, ...page };
  }

  render() {
    const { helmet, assets, data } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();

    return (
      <html lang="en-GB" {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
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
