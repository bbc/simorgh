import React, { useContext } from 'react';
import Grid, { GelPageGrid } from '#app/components/Grid';
import { ServiceContext } from '#contexts/ServiceContext';

export default ({ children }) => {
  const { dir } = useContext(ServiceContext);

  return (
    <GelPageGrid
      dir={dir}
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 20,
      }}
      enableGelGutters
    >
      <Grid
        item
        dir={dir}
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
          group3: 6,
          group4: 6,
          group5: 12,
        }}
        margins={{ group0: true, group1: true, group2: true, group3: true }}
      >
        {children}
      </Grid>
    </GelPageGrid>
  );
};
