import React from 'react';
import { bool } from 'prop-types';
import { GhostWrapper, GridItemConstrainedMedium } from '../../lib/styledGrid';

const WithLoading = Component => ({ loading, ...props }) => {
  if (!loading) return <Component {...props} />;
  return (
    <main role="main">
      <GhostWrapper>
        <GridItemConstrainedMedium />
      </GhostWrapper>
    </main>
  );
};

WithLoading.propTypes = {
  loading: bool,
};

WithLoading.defaultProps = {
  loading: false,
};

export default WithLoading;
