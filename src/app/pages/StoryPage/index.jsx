import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import StoryPage from './StoryPage';
import StoryPageLow from './StoryPage.low';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const StoryPageToRender = props => {
  const { isLow } = useContext(RequestContext);
  const OptimizelyStoryPage = withOptimizelyProvider(StoryPage);

  return !isLow ? (
    <OptimizelyStoryPage {...props} />
  ) : (
    <StoryPageLow {...props} />
  );
};

export default applyBasicPageHandlers({
  addVariantHandling: false,
})(StoryPageToRender);
