import React from 'react';
import { arrayOf, shape } from 'prop-types';
import frontPageGroup from '#models/propTypes/frontPageGroup';
import { Grid, GridItemConstrainedLargeWithTopMargin } from '#lib/styledGrid';
import FrontPageSection from '../FrontPageSection';

const StoryPromoGroups = ({ groups }) => (
  <Grid>
    <GridItemConstrainedLargeWithTopMargin>
      {groups.map((group, index) => (
        <FrontPageSection
          key={group.title}
          group={group}
          sectionNumber={index}
        />
      ))}
    </GridItemConstrainedLargeWithTopMargin>
  </Grid>
);

StoryPromoGroups.propTypes = {
  groups: arrayOf(shape(frontPageGroup)).isRequired,
};

export default StoryPromoGroups;
