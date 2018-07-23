import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document from '../../components/Document';

class DocumentContainer extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = await renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { assets, data, ...page, styleTags };
  }

  render() {
    return <Document {...this.props} />;
  }
}

export default DocumentContainer;
