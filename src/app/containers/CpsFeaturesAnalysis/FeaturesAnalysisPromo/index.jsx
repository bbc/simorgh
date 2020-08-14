import React, { useContext } from 'react';
import StoryPromo from '../../StoryPromo';
import { ServiceContext } from '#contexts/ServiceContext';

const FeaturesAnalysisPromo = promo => {
  const { dir } = useContext(ServiceContext); // TODO could this be passed in?
  return <StoryPromo item={promo} dir={dir} displayImage />;
};

export default FeaturesAnalysisPromo;
