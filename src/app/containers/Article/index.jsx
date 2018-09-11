import React, { Component } from 'react';
import 'isomorphic-fetch';
import Article from '../../components/Article';
import MainContent from '../MainContent';
import articlePropTypes from '../../models/propTypes/article';
import isAmpPath from '../../helpers/isAmpPath';
import serviceConfig from '../../lib/serviceConfig';

class ArticleContainer extends Component {
  static async getInitialProps({ req, match } = {}) {
    try {
      const { path } = match;
      const { id } = match.params;

      const regex = '^(c[a-zA-Z0-9]{10}o)$';
      const routeMatches = id.match(regex);

      if (!routeMatches) {
        throw new Error(
          `Invalid route parameter: ${id}. ID parameter must be in format 'c[xxxxxxxxxx]o', where the middle part could be 0000000001 to 0000000027.`,
        );
      }

      let url = `/data/${id}.json`;

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
    const { id: aresArticleId, tags } = metadata;

    const id = aresArticleId.split(':').pop();
    const { blocks } = content.model;

    /* metaTags: An array of each thingLabel from tags.about & tags.mention */
    const { about, mentions } = tags;
    const aboutTags = about ? about.map(thing => thing.thingLabel) : [];
    const mentionTags = mentions ? mentions.map(thing => thing.thingLabel) : [];
    const metaTags = aboutTags.concat(mentionTags);

    /* Timestamps converted to ISO 8601 format */
    const timeFirstPublished = new Date(metadata.firstPublished).toISOString();
    const timeLastUpdated = new Date(metadata.lastUpdated).toISOString();

    const service = 'news'; /* Temporarily hard-coded to news */
    /* Canonical link generated from servicename and id */
    const canonicalLink = `https://www.bbc.com/${service}/articles/${id}`;

    /* Service-specific config imported from file */
    const config = serviceConfig[service];

    return (
      <Article
        amp={amp}
        articleAuthor={config.articleAuthor}
        articleSection={metadata.passport.genre}
        canonicalLink={canonicalLink}
        defaultImage={config.defaultImage}
        defaultImageAltText={config.defaultImageAltText}
        description={promo.summary}
        lang={metadata.passport.language}
        locale={config.locale}
        metaTags={metaTags}
        opengraphSiteName={config.opengraphSiteName}
        timeLastUpdated={timeLastUpdated}
        timeFirstPublished={timeFirstPublished}
        title={promo.headlines.seoHeadline}
        twitterCreator={config.twitterCreator}
        twitterSite={config.twitterSite}
      >
        <MainContent blocks={blocks} />
      </Article>
    );
  }
}

ArticleContainer.propTypes = articlePropTypes;

ArticleContainer.defaultProps = {
  amp: false,
  data: null,
};

export default ArticleContainer;
