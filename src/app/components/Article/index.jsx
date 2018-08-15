import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';
import Header from '../Header';
import MainContent from '../../containers/MainContent';
import mainContentPropTypes from '../../models/propTypes/mainContent';

const Article = ({ lang, title, blocks, id }) => {
  const canonicalLink = `https://www.bbc.com/news/article/${id}`;

  return (
    <Fragment>
      <Helmet htmlAttributes={{ lang }}>
        <title>{title}</title>
        <link rel="canonical" href={canonicalLink} />
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
