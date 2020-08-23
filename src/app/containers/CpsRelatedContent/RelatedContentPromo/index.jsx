import React from 'react';
import { shape, string, oneOfType } from 'prop-types';
import Grid from '../../../components/Grid';
import StoryPromo from '../../StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';

const RelatedContentPromo = ({ promo, dir }) => (
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

RelatedContentPromo.propTypes = {
  dir: string.isRequired,
  promo: oneOfType([shape(storyItem)]).isRequired,
};

export default RelatedContentPromo;
