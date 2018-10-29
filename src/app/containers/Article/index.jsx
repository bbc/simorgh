import React, { Fragment } from 'react';
import { bool, string, shape } from 'prop-types';
import MetadataContainer from '../Metadata';
import Header from '../../components/Header';
import Footer from '../Footer';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import { MainContent, ConstrainedGridItem } from '../../components/MainContent';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContextProvider } from '../../components/ServiceContext';

const componentsToRenderHeadline = {
  headline: headings,
};

const componentsToRenderMain = {
  subheadline: headings,
  text,
  image,
};

const splitBlocksByHeadline = ({ model }) => {
  const { blocks } = model;

  const headlineIndexPlusOne =
    blocks.findIndex(({ type }) => type === 'headline') + 1;

  const headlineBlocks = blocks.slice(0, headlineIndexPlusOne);
  const mainBlocks = blocks.slice(headlineIndexPlusOne, blocks.length);

  return { headlineBlocks, mainBlocks };
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

    const { headlineBlocks, mainBlocks } = splitBlocksByHeadline(content);

    /*
    * headlineBlocks length check is temporary
    * Simorgh will respond with 400 to lack of headline block in issue 
    * https://github.com/BBC-News/simorgh/issues/836
    */
    if (headlineBlocks.length > 0) {
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
              <ConstrainedGridItem fullWidthBackgroundColor="white">
                <Blocks
                  blocks={headlineBlocks}
                  componentsToRender={componentsToRenderHeadline}
                />
              </ConstrainedGridItem>
              <ConstrainedGridItem fullWidthBackgroundColor="#f5f3f1">
                <Blocks
                  blocks={mainBlocks}
                  componentsToRender={componentsToRenderMain}
                />
              </ConstrainedGridItem>
            </MainContent>
            <Footer />
          </ServiceContextProvider>
        </Fragment>
      );
    }
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
