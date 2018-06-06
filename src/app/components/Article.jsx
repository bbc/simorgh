import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';

class Article extends Component {
  state = {
    headline: 'Article Headline',
  };

  static async getInitialProps() {
    try {
      const response = await fetch('/data/scenario-01.json');
      return { response };
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
