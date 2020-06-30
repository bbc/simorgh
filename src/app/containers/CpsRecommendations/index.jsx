import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import data from './recommendations.ltr.json';

const CpsRecommendations = () => {
  const { recommendations } = useContext(ServiceContext);
  const { enabled } = useToggle('cpsRecommendations');

  const { hasStoryRecommendations } = recommendations;

  if (!hasStoryRecommendations || !enabled) return null;

  return <div>Recommendations Container</div>;
};

export default CpsRecommendations;

CpsRecommendations.propTypes = {
  /*
  items: arrayOf(
    shape({
      assetUri: string.isRequired,
      shortHeadline: string.isRequired,
      imageHref: string.isRequired,
    }),
  ),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }).isRequired,
  */
};

CpsRecommendations.defaultProps = {
  items: data.items,
};
