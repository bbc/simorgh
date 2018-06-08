import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import styled from 'styled-components';

import Experiment from './Experiment';
import Variant from './Variant';

const Headline = styled.h1`
  color: #222;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  font-size: 2em;
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
        <Experiment>
          <Variant name="One">
            <Headline>One</Headline>
          </Variant>
          <Variant name="Three">
            <Headline>Three</Headline>
          </Variant>
          <Variant name="Four">
            <Headline>Four</Headline>
          </Variant>
          <Variant name="Five">
            <Headline>Five</Headline>
          </Variant>
          <Variant name="Six">
            <Headline>Six</Headline>
          </Variant>
        </Experiment>
      </Fragment>
    );
  }
}

export default Article;
