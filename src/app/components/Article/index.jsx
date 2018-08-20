import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';
import Header from '../Header';
import MainContent from '../../containers/MainContent';
import mainContentPropTypes from '../../models/propTypes/mainContent';
import { C_POSTBOX } from '../../lib/constants/styles';

import '../../lib/globalStyles';

const Article = ({ lang, title, blocks, id }) => {
  const canonicalLink = `https://www.bbc.com/news/articles/${id}`;

  return (
    <Fragment>
      <Helmet htmlAttributes={{ lang }}>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <title>{title}</title>
        <meta name="robots" content="nofollow" />
        <meta name="theme-color" content={C_POSTBOX} />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" href={canonicalLink} />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="preconnect"
          href="https://ichef.bbci.co.uk"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://static.bbci.co.uk"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://gel.files.bbci.co.uk"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://ichef.bbci.co.uk" />
        <link rel="dns-prefetch" href="https://static.bbci.co.uk" />
        <link rel="dns-prefetch" href="https://gel.files.bbci.co.uk" />
      </Helmet>
      <Header />
      <MainContent blocks={blocks} />
    </Fragment>
  );
};

Article.propTypes = {
  id: string.isRequired,
  lang: string.isRequired,
  title: string.isRequired,
  ...mainContentPropTypes.isRequired,
};

export default Article;
