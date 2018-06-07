import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import styled from 'styled-components';

const Headline = styled.h1`
  color: #bb1919;
  text-align: center;
  font-family: sans-serif;
  font-size: 4em;
`;

class Article extends Component {
  state = {
    headline: 'Article Headline',
  };

  static async getInitialProps({ req } = {}) {
    let url = '/data/scenario-01.json';

    if (req) {
      url = `${process.env.RAZZLE_BASE_PATH}${url}`;
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
        <Headline>{headline}</Headline>
      </Fragment>
    );
  }
}

export default Article;
