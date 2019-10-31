import React from 'react';
import { bool, element } from 'prop-types';
import Grid, { GelPageGridGhost } from '#app/components/Grid';

const WithLoading = Component => {
  const LoadingContainer = ({ loading, ...props }) => {
    if (!loading) return <Component {...props} />;
    return (
      <GelPageGridGhost
        as="main"
        role="main"
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 8,
          group5: 20,
        }}
        enableGelGutters
        enableGelMargins
      >
        <Grid
          item
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 2,
            group5: 5,
          }}
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 5,
            group4: 5,
            group5: 10,
          }}
        >
          <div />
        </Grid>
      </GelPageGridGhost>
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
