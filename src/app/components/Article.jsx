import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import fetch from 'isomorphic-fetch';

class Article extends Component {
  state = {
    headline: 'Article Headline',
  };

  static async getInitialProps({ req }) {
    const path = '/data/scenario-01.json';
    let url = path;

    if (req !== null) {
      url = `http://localhost:7080${path}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      return { data };
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  render() {
    const { headline } = this.state;
    return (
      <Fragment>
        <Helmet htmlAttributes={{ lang: 'en-GB' }}>
          <title>{headline}</title>
        </Helmet>
        <h1>{headline}</h1>
      </Fragment>
    );
  }
}

export default Article;
