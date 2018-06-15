import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import propTypes from 'prop-types';
import Header from './Header';
import MainContent from './MainContent';

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

    return (
      <Fragment>
        <Helmet htmlAttributes={{ lang: 'en-GB' }}>
          <title>{headline}</title>
        </Helmet>
        <Header />
        <MainContent data={model} />
      </Fragment>
    );
  }
}

export default Article;
