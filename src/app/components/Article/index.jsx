import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import Header from '../Header';
import MainContent from '../MainContent';
import { textBlock } from '../../models/blocks';

class Article extends Component {
  state = {
    data: {
      title: 'Article Headline',
      model: {
        blocks: [
          {
            type: 'headline',
            blockId: '1',
            model: textBlock('Article Headline'),
          },
        ],
      },
    },
  };

  static async getInitialProps({ req, match } = {}) {
    try {
      const { id } = match.params;
      let url = `/data/${id}.json`;

      if (req) {
        url = `${process.env.RAZZLE_BASE_PATH}${url}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      return { data };
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      return {};
    }
  }

  render() {
    const { data } = this.state;
    const { title, model } = data;

    return (
      <Fragment>
        <Helmet htmlAttributes={{ lang: 'en-GB' }}>
          <title>{title}</title>
        </Helmet>
        <Header />
        <MainContent {...model} />
      </Fragment>
    );
  }
}

export default Article;
