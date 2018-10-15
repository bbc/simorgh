import React, { Fragment } from 'react';
import { bool, string, shape } from 'prop-types';
import MetadataContainer from '../Metadata';
import Header from '../../components/Header';
import Footer from '../Footer';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import MainContent from '../../components/MainContent';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContextProvider } from '../../components/ServiceContext';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
};

/*
  [1] This handles async data fetching, and a 'loading state', which we should look to handle more intelligently.
*/
const ArticleContainer = ({ loading, error, data }) => {
  if (loading) return 'Loading...'; /* [1] */
  if (error) return 'Something went wrong :(';
  if (data) {
    const { isAmp, data: articleData, service } = data;
    const { content, metadata, promo } = articleData;

    return (
      <Fragment>
        <ServiceContextProvider service={service}>
          <Header />
          <MetadataContainer
            isAmp={isAmp}
            metadata={metadata}
            promo={promo}
            service={service}
          />
          <MainContent>
            <Blocks
              blocks={content.model.blocks}
              componentsToRender={componentsToRender}
            />
          </MainContent>
          <Footer />
        </ServiceContextProvider>
      </Fragment>
    );
  }

  return null;
};

ArticleContainer.propTypes = {
  loading: bool,
  error: string,
  data: shape(articlePropTypes),
};

ArticleContainer.defaultProps = {
  loading: false,
  error: null,
  data: null,
};

export default ArticleContainer;
