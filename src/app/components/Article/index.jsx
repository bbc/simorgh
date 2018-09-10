import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { bool, string, node } from 'prop-types';
import Header from '../Header';
import Footer from '../../containers/Footer';

const Article = ({ amp, children, description, id, lang, title }) => {
  const canonicalLink = `https://www.bbc.com/news/articles/${id}`;
  const htmlAttributes = { lang };

  if (amp) {
    htmlAttributes.amp = amp;
  }

  return (
    <Fragment>
      <Helmet htmlAttributes={htmlAttributes}>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <title>{title}</title>
        <link rel="canonical" href={canonicalLink} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@BBCNews" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@BBCNews" />
        <meta
          name="twitter:image:src"
          content="https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1"
        />
        <meta name="twitter:image:alt" content="BBC News" />
      </Helmet>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

Article.propTypes = {
  amp: bool.isRequired,
  children: node.isRequired,
  description: string.isRequired,
  id: string.isRequired,
  lang: string.isRequired,
  title: string.isRequired,
};

export default Article;
