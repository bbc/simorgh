import React from 'react';
import { bool, element } from 'prop-types';
import { GridWrapper, GridItemConstrainedMedium } from '#lib/styledGrid';

const WithLoading = (Component) => {
  const LoadingContainer = ({ loading, ...props }) => {
    if (!loading) return <Component {...props} />;
    return (
      <main role="main">
        <GridWrapper>
          <GridItemConstrainedMedium />
        </GridWrapper>
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
