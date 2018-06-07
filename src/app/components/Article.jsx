import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';

class Article extends Component {
  state = {
    headline: 'Article Headline',
  };

  static async getInitialProps(context) {
    let url = '/data/scenario-01.json';

    if (
      typeof context !== 'undefined' &&
      Object.prototype.hasOwnProperty.call(context, 'req')
    ) {
      url = `${process.env.BASE_PATH}${url}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      return { data };
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
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
