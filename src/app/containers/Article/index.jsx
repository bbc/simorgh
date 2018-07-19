import React, { Component } from 'react';
import 'isomorphic-fetch';
import Article from '../../components/Article';
import { textBlock } from '../../models/blocks';

class ArticleContainer extends Component {
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

    return <Article lang="en-GB" title={title} data={model} />;
  }
}

export default ArticleContainer;
