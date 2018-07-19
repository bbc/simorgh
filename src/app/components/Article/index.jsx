import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { string, any } from 'prop-types';
import Header from '../Header';
import MainContent from '../MainContent';

const Article = ({ language, title, data }) => (
  <Fragment>
    <Helmet htmlAttributes={{ lang: language }}>
      <title>{title}</title>
    </Helmet>
    <Header />
    <MainContent data={data} />
  </Fragment>
);

Article.propTypes = {
  language: string.isRequired,
  title: string.isRequired,
  data: any.isRequired, // eslint-disable-line
};

export default Article;
