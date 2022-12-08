import React from 'react';
import { shape, string, oneOfType } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import useViewTracker from '#hooks/useViewTracker';
import Grid from '../../../components/Grid';
import StoryPromo from '../../StoryPromo';

const RelatedContentPromo = ({ promo, dir, eventTrackingData }) => {
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

RelatedContentPromo.propTypes = {
  dir: string.isRequired,
  promo: oneOfType([shape(storyItem)]).isRequired,
  eventTrackingData: shape({
    componentName: string,
  }),
};

RelatedContentPromo.defaultProps = {
  eventTrackingData: null,
};

export default RelatedContentPromo;
