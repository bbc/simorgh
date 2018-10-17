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
import TitleContent from '../../components/TitleContent';
import BodyContent from '../../components/BodyContent';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContextProvider } from '../../components/ServiceContext';

const splitBlocks = ({ blocks }) => {
  // find the index of the headline block
  const headlineIndex = blocks.findIndex(block => block.type === 'headline');

  // remove everything after the headline
  const titleBlocks = blocks.slice(0, headlineIndex + 1);

  // remove everything up to and include the headline block
  const bodyBlocks = blocks.slice(headlineIndex + 1);

  return {
    titleBlocks,
    bodyBlocks,
  };
};

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

    const { titleBlocks, bodyBlocks } = splitBlocks(content.model);

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
            <TitleContent>
              <Blocks
                blocks={titleBlocks}
                componentsToRender={componentsToRender}
              />
            </TitleContent>
            <BodyContent>
              <Blocks
                blocks={bodyBlocks}
                componentsToRender={componentsToRender}
              />
            </BodyContent>
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
