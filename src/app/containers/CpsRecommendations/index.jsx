import React, { useContext } from 'react';
import { shape, arrayOf, number, string } from 'prop-types';
import { Headline, Link } from '@bbc/psammead-story-promo';

import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import Grid from '../../components/Grid';

const CpsRecommendations = ({ items, parentColumns }) => {
  const { recommendations, script } = useContext(ServiceContext);
  const { enabled } = useToggle('cpsRecommendations');

  const { hasStoryRecommendations } = recommendations;

  if (!hasStoryRecommendations || !enabled) return null;

  return (
    <Grid
      columns={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 1,
        group5: 1,
      }}
      parentColumns={parentColumns}
      enableGelGutters
    >
      {items.map(({ shortHeadline, assetUri }) => (
        <Headline script={script}>
          <Link href={assetUri}>{shortHeadline}</Link>
        </Headline>
      ))}
    </Grid>
  );
};

export default CpsRecommendations;

CpsRecommendations.propTypes = {
  items: arrayOf(
    shape({
      assetUri: string.isRequired,
      shortHeadline: string.isRequired,
      imageHref: string.isRequired,
    }),
  ).isRequired,
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }).isRequired,
};
