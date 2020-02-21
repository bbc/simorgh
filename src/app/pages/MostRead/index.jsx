import React from 'react';
import { string } from 'prop-types';
import pipe from 'ramda/src/pipe';
import MostRead from '../../containers/MostRead';

import withVariant from '../../containers/PageHandlers/withVariant';
import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withLoading from '../../containers/PageHandlers/withLoading';
import withError from '../../containers/PageHandlers/withError';

const MostReadContainer = ({ mostReadEndpointOverride }) => (
  <div style={{ maxWidth: '1280px', margin: '32px auto' }}>
    <MostRead mostReadEndpointOverride={mostReadEndpointOverride} />
  </div>
);

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: null,
};

const EnhancedMostReadContainer = pipe(
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
  withVariant,
)(MostReadContainer);

export default EnhancedMostReadContainer;
