import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';
import Header from '../Header';
import MainContent from '../../containers/MainContent';
import mainContentPropTypes from '../../models/propTypes/mainContent';
import Footer from '../../containers/Footer';

const Article = ({ lang, title, blocks, id }) => {
  const canonicalLink = `https://www.bbc.com/news/articles/${id}`;

  return (
    <Fragment>
      <Helmet htmlAttributes={{ lang }}>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <title>{title}</title>
        <link rel="canonical" href={canonicalLink} />
      </Helmet>
      <Header />
      <MainContent blocks={blocks} />
      <Footer />
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
