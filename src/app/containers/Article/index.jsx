import React, { Component, Fragment } from 'react';
import 'isomorphic-fetch';
import Metadata from '../../components/Metadata';
import Header from '../../components/Header';
import Footer from '../Footer';
import MainContent from '../MainContent';
import articlePropTypes from '../../models/propTypes/article';
import isAmpPath from '../../helpers/isAmpPath';
import GlobalStyle from '../../lib/globalStyles';

const validateService = service => {
  const services = ['news', 'persian'];
  const serviceMatch = services.includes(service);

  if (!serviceMatch) {
    throw new Error(
      `Invalid route parameter: ${service}. Service parameter must be news or persian.`,
    );
  }
};

const validateId = id => {
  const regex = '^(c[a-zA-Z0-9]{10}o)$';
  const routeMatches = id.match(regex);

  if (!routeMatches) {
    throw new Error(
      `Invalid route parameter: ${id}. ID parameter must be in format 'c[xxxxxxxxxx]o', where the middle part could be 0000000001 to 0000000027.`,
    );
  }
};

class ArticleContainer extends Component {
  static async getInitialProps({ req, match } = {}) {
    try {
      const { path } = match;
      const { id, service } = match.params;

      validateService(service);
      validateId(id);

      let url = `/data/${service}/${id}.json`;

      if (req) {
        url = `${process.env.RAZZLE_BASE_PATH}${url}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      const amp = isAmpPath(path);

      return { amp, data };
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      return {};
    }
  }

  render() {
    const { amp, data } = this.props;
    /*
      This handles async data fetching, and a 'loading state', which we should look to handle more intelligently.
      After.JS gives no explicit loading state, so we just have to check for a lack of data.
      After.JS should handle async data fetching in a more informative way, which will be become an issue for error handling.
    */
    if (!data) {
      return 'Loading...';
    }

    const { content, metadata, promo } = data;
    const { id: aresArticleId } = metadata;

    const id = aresArticleId.split(':').pop();
    const { blocks } = content.model;
    const canonicalLink = `https://www.bbc.com/news/articles/${id}`;

    const metadataProps = {
      amp,
      canonicalLink,
      lang: metadata.passport.language,
      title: promo.headlines.seoHeadline,
    };

    return (
      <Fragment>
        <Header />
        <GlobalStyle />
        <Metadata {...metadataProps} />
        <MainContent blocks={blocks} />
        <Footer />
      </Fragment>
    );
  }
}

ArticleContainer.propTypes = articlePropTypes;

ArticleContainer.defaultProps = {
  amp: false,
  data: null,
};

export default ArticleContainer;
