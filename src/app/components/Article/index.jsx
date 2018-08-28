import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { string, node } from 'prop-types';
import Header from '../Header';
import Footer from '../../containers/Footer';

const Article = ({ lang, title, id, children }) => {
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
      {children}
      <Footer />
    </Fragment>
  );
};

Article.propTypes = {
  children: node.isRequired,
  id: string.isRequired,
  lang: string.isRequired,
  title: string.isRequired,
};

export default Article;
