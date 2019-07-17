import React from 'react';
import { bool, element } from 'prop-types';
import {
  GhostGridWithPadding,
  GridItemConstrainedMedium,
} from '../../lib/styledGrid';

const WithLoading = Component => {
  const LoadingContainer = ({ loading, ...props }) => {
    if (!loading) return <Component {...props} />;
    return (
      <main role="main">
        <GhostGridWithPadding>
          <GridItemConstrainedMedium />
        </GhostGridWithPadding>
      </main>
    );
  };

  LoadingContainer.propTypes = {
    loading: bool,
  };

  LoadingContainer.defaultProps = {
    loading: false,
  };

  return LoadingContainer;
};

WithLoading.propTypes = {
  Component: element,
};

export default WithLoading;
