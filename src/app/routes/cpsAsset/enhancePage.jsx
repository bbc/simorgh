import React from 'react';
import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import {
  withContexts,
  withPageWrapper,
  withError,
  withLoading,
  withData,
} from '../../HOCs';
import {
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
} from '../../constants/pageTypes';
import enhanceFrontPage from '../index/enhancePage';
import ErrorPage from '../../containers/ErrorMain';

const getCpsAssetType = path(['pageData', 'metadata', 'type']);

export default Component => props => {
  const cpsAssestType = getCpsAssetType(props);

  switch (cpsAssestType) {
    case STORY_PAGE:
    case PHOTO_GALLERY_PAGE:
    case MEDIA_ASSET_PAGE: {
      const CpsAssetPage = pipe(
        withData,
        withError,
        withLoading,
        withPageWrapper,
        withContexts,
      )(Component);

      return <CpsAssetPage {...props} />;
    }
    case FEATURE_INDEX_PAGE: {
      // TODO: Create FIX Page if required
      const FrontPage = enhanceFrontPage(Component);

      return <FrontPage {...props} />;
    }
    default: {
      // Return 404 error page if page type does not match those above
      return <ErrorPage {...props} pageType="error" status={404} />;
    }
  }
};
