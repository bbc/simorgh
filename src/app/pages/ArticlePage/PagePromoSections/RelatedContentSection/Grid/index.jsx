import Grid from '#app/components/Grid';
import React from 'react';

const RelatedContentGrid = props => {
  return (
    <Grid
      {...props}
      startOffset={{
        group0: 0,
        group1: 0,
        group2: 0,
        group3: 0,
        group4: 0,
        group5: 0,
      }}
      columns={{
        group0: 1,
        group1: 1,
        group2: 2,
        group3: 2,
        group4: 2,
        group5: 2,
      }}
    />
  );
};

RelatedContentGrid.propTypes = {};

export default RelatedContentGrid;
