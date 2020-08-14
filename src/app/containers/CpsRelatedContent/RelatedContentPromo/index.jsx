import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import Grid from '../../../components/Grid';
import StoryPromo from '../../StoryPromo';

const RelatedContentPromo = promo => {
  const { dir } = useContext(ServiceContext);
  return (
    <Grid
      columns={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 2,
        group5: 2,
      }}
      enableGelGutters
      dir={dir}
    >
      <StoryPromo item={promo} dir={dir} />
    </Grid>
  );
};

export default RelatedContentPromo;
