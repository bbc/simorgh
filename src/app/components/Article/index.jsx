import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';
import Header from '../Header';
import MainContent from '../../containers/MainContent';
import Footer from '../../containers/Footer';
import mainContentPropTypes from '../../models/propTypes/mainContent';

const Article = ({ lang, title, blocks }) => (
  <Fragment>
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
    </Helmet>
    <Header />
    <MainContent blocks={blocks} />
    <Footer />
  </Fragment>
);

Article.propTypes = {
  lang: string.isRequired,
  title: string.isRequired,
  ...mainContentPropTypes.isRequired,
};

export default Article;
