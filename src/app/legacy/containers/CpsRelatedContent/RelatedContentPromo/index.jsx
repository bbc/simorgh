import React from 'react';
import useViewTracker from '#hooks/useViewTracker';
import Grid from '#legacy/components/Grid';
import StoryPromo from '../../StoryPromo';

const RelatedContentPromo = ({ promo, dir, eventTrackingData = null }) => {
  const viewRef = useViewTracker(eventTrackingData);

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
      ref={viewRef}
    >
      <StoryPromo
        item={promo}
        dir={dir}
        eventTrackingData={eventTrackingData}
      />
    </Grid>
  );
};

export default RelatedContentPromo;
