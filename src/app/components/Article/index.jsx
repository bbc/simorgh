import React, { Fragment } from 'react';
import { node } from 'prop-types';
import Header from '../Header';
import Footer from '../../containers/Footer';

const Article = ({ children }) => (
  <Fragment>
    <Header />
    {children}
    <Footer />
  </Fragment>
);

Article.propTypes = {
  children: node.isRequired,
};

export default Article;
