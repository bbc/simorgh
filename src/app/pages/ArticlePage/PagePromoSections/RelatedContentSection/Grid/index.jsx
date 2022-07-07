import Grid from '#app/components/Grid';
import React from 'react';

const RelatedContentGrid = props => {
  return (
    <Grid
      {...props}
      columns={{
        group0: 1,
        group1: 1,
        group2: 2,
        group3: 2,
        group4: 2,
        group5: 2,
      }}
      enableGelGutters
    />
  );
};

RelatedContentGrid.propTypes = {};

export default RelatedContentGrid;
