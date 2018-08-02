import React, { Component } from 'react';
import 'isomorphic-fetch';
import Article from '../../components/Article';
import articlePropTypes from '../../models/propTypes/article';

class ArticleContainer extends Component {
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
    const { data } = this.props;
    const { content, metadata, promo } = data;

    return (
      <Article
        lang={metadata.passport.language}
        title={promo.headlines.seoHeadline}
        {...content.model}
      />
    );
  }
}

ArticleContainer.propTypes = articlePropTypes;

export default ArticleContainer;
