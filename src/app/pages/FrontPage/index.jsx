import React from 'react';
import { string, shape } from 'prop-types';
import pipe from 'ramda/src/pipe';
import frontPagePropTypes from '#models/propTypes/frontPage';
import FrontPageMain from '../../containers/FrontPageMain';

import withVariant from '../../containers/PageHandlers/withVariant';
import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withLoading from '../../containers/PageHandlers/withLoading';
import withError from '../../containers/PageHandlers/withError';
import withData from '../../containers/PageHandlers/withData';

const FrontPageContainer = ({ pageData, mostReadEndpointOverride }) => (
  <FrontPageMain
    frontPageData={pageData}
    mostReadEndpointOverride={mostReadEndpointOverride}
  />
);

FrontPageContainer.propTypes = {
  pageData: shape(frontPagePropTypes),
  mostReadEndpointOverride: string,
};

FrontPageContainer.defaultProps = {
  pageData: null,
  mostReadEndpointOverride: null,
};

const EnhancedFrontPageContainer = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
  withVariant,
)(FrontPageContainer);

export default EnhancedFrontPageContainer;
