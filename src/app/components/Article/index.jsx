import React, { Fragment } from 'react';
import { bool, string, node } from 'prop-types';
import Metadata from './Metadata';
import Header from '../Header';
import Footer from '../../containers/Footer';

const Article = ({ amp, lang, title, id, children }) => {
  const canonicalLink = `https://www.bbc.com/news/articles/${id}`;
  const htmlAttributes = { lang };

  if (amp) {
    htmlAttributes.amp = amp;
  }

  const metadataProps = {
    canonicalLink,
    htmlAttributes,
    title,
  };

  return (
    <Fragment>
      <Metadata {...metadataProps} />
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

Article.propTypes = {
  amp: bool.isRequired,
  children: node.isRequired,
  id: string.isRequired,
  lang: string.isRequired,
  title: string.isRequired,
};

export default Article;
