import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import AMPDocument from 'react-amp-document';
import Header from '../../components/Header';
import Footer from '../Footer';

/*
  [1] This handles async data fetching, and a 'loading state', which we should look to handle more intelligently.
*/
const ArcivedArticleContainer = ({ data }) => (
  <Fragment>
    <Header />
    <AMPDocument src={data.ampUrl} />
    <Footer />
  </Fragment>
);

ArcivedArticleContainer.propTypes = {
  data: shape,
};

ArcivedArticleContainer.defaultProps = {
  data: null,
};

export default ArcivedArticleContainer;
