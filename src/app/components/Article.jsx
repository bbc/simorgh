import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Header from './Header';

const Headline = styled.h1`
  color: #222;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  font-size: 2em;
`;

const renderModel = ({ blocks }) =>
  blocks.map(block => {
    const { type, blockId } = block;
    const blockString = JSON.stringify(block);

    let Element = 'p';
    if (type === 'headline') {
      Element = Headline;
    }

    return (
      <Element key={blockId}>
        {type}: {blockString}
      </Element>
    );
  });

class Article extends Component {
  static propTypes = {
    model: propTypes.shape({
      blocks: propTypes.arrayOf(propTypes.any),
    }),
  };

  static defaultProps = {
    model: {
      blocks: [],
    },
  };

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
      const { model } = await response.json();
      return { model };
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      return {};
    }
  }

  render() {
    const { headline } = this.state;
    const { model } = this.props;

    const renderedModel = renderModel(model);
    return (
      <Fragment>
        <Helmet htmlAttributes={{ lang: 'en-GB' }}>
          <title>{headline}</title>
        </Helmet>
        <Header />
        {renderedModel}
      </Fragment>
    );
  }
}

export default Article;
