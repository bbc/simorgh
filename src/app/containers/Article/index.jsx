import React, { Component, Fragment } from 'react';
import 'isomorphic-fetch';
import Metadata from '../../components/Metadata';
import Header from '../../components/Header';
import Footer from '../Footer';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import MainContent from '../../components/MainContent';
import articlePropTypes from '../../models/propTypes/article';
import isAmpPath from '../../helpers/isAmpPath';
import serviceConfig from '../../lib/serviceConfig';

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

const blocksToRender = {
  headline: headings,
  subheading: headings,
  text,
  image,
};

/* An array of each thingLabel from tags.about & tags.mention */
const allTags = tags => {
  const { about, mentions } = tags;
  const aboutTags = about ? about.map(thing => thing.thingLabel) : [];
  const mentionTags = mentions ? mentions.map(thing => thing.thingLabel) : [];
  return aboutTags.concat(mentionTags);
};

const metadataProps = (amp, config, id, metadata, promo, service) => {
  /* Canonical link generated from servicename and id */
  const canonicalLink = `https://www.bbc.com/${service}/articles/${id}`;
  const timeFirstPublished = new Date(metadata.firstPublished).toISOString();
  const timeLastUpdated = new Date(metadata.lastUpdated).toISOString();

  return {
    amp,
    articleAuthor: config.articleAuthor,
    articleSection: metadata.passport.genre,
    canonicalLink,
    defaultImage: config.defaultImage,
    defaultImageAltText: config.defaultImageAltText,
    description: promo.summary,
    lang: metadata.passport.language,
    locale: config.locale,
    metaTags: allTags(metadata.tags),
    opengraphSiteName: config.opengraphSiteName,
    timeFirstPublished,
    timeLastUpdated,
    title: promo.headlines.seoHeadline,
    twitterCreator: config.twitterCreator,
    twitterSite: config.twitterSite,
    type: metadata.type,
  };
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

      return { amp, data, service };
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      return {};
    }
  }

  /*
    [1] This handles async data fetching, and a 'loading state', which we should look to handle more intelligently.
      After.JS gives no explicit loading state, so we just have to check for a lack of data.
      After.JS should handle async data fetching in a more informative way, which will be become an issue for error handling.
  */
  render() {
    const { amp, data, service } = this.props;
    if (!data) {
      return 'Loading...'; /* [1] */
    }
    const { content, metadata, promo } = data;
    const { id: aresArticleId } = metadata;
    const id = aresArticleId.split(':').pop();
    const config = serviceConfig[service];
    return (
      <Fragment>
        <Header />
        <Metadata
          {...metadataProps(amp, config, id, metadata, promo, service)}
        />
        <MainContent>
          <Blocks
            blocks={content.model.blocks}
            blocksToRender={blocksToRender}
          />
        </MainContent>
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
