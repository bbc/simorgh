import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import Header from '../Header';
import MainContent from '../MainContent';

const Article = ({ lang, title, data }) => (
  <Fragment>
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
    </Helmet>
    <Header />
    <MainContent data={data} />
  </Fragment>
);

export default Article;
