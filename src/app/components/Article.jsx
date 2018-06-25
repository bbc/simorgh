import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import styled from 'styled-components';
import Header from './Header';

import { C_EBON, FF_NEWS } from '../../lib/constants/styles';

const Headline = styled.h1`
  color: ${C_EBON};
  font-family: ${FF_NEWS};
  font-size: 2em;
`;

class Article extends Component {
  state = {
    headline: 'Article Headline',
  };

  static async getInitialProps({ req } = {}) {
    let url = '/data/test/scenario-01.json';

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
        <Header />
        <Headline>{headline}</Headline>
      </Fragment>
    );
  }
}

export default Article;
