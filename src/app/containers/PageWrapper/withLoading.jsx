import React from 'react';
import { bool } from 'prop-types';
import { GhostWrapper, GridItemConstrainedMedium } from '../../lib/styledGrid';
import PageWrapper from '../PageWrapper';

const WithLoading = Component => {
  return function WithLoadingComponent({ loading, ...props }) {
    if (!loading) return <Component {...props} />;
    return (
      <PageWrapper>
        <main role="main">
          <GhostWrapper>
            <GridItemConstrainedMedium />
          </GhostWrapper>
        </main>
      </PageWrapper>
    );
  };
};

WithLoading.propTypes = {
  loading: bool,
};

WithLoading.defaultProps = {
  loading: false,
};

export default WithLoading;
