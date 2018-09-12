import React, { Fragment } from 'react';
import { node } from 'prop-types';
import Header from '../Header';
import Footer from '../../containers/Footer';
import GlobalStyle from '../../lib/globalStyles';

const Article = ({ children }) => (
  <Fragment>
    <Header />
    {children}
    <GlobalStyle />
    <Footer />
  </Fragment>
);

Article.propTypes = {
  children: node.isRequired,
};

export default Article;
