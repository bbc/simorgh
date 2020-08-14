import React, { useContext } from 'react';
import StoryPromo from '../../StoryPromo';
import { ServiceContext } from '#contexts/ServiceContext';

const TopStoriesPromo = promo => {
  const { dir } = useContext(ServiceContext); // TODO pass down in props?
  return (
    <StoryPromo
      item={promo}
      dir={dir}
      displayImage={false}
      displaySummary={false}
    />
  );
};

export default TopStoriesPromo;
