import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import frontPageGroup from '#models/propTypes/frontPageGroup';
import { Grid, GridItemConstrainedLarge } from '#lib/styledGrid';
import FrontPageSection from '../FrontPageSection';
import Title from './Title';

const StoryPromoGroups = ({ groups, title }) => {
  return (
    <Grid>
      <GridItemConstrainedLarge>
        {title && <Title>{title}</Title>}
        {groups.map((group, index) => (
          <FrontPageSection
            key={group.title}
            group={group}
            sectionNumber={index}
          />
        ))}
      </GridItemConstrainedLarge>
    </Grid>
  );
};

StoryPromoGroups.propTypes = {
  groups: arrayOf(shape(frontPageGroup)).isRequired,
  title: string,
};

StoryPromoGroups.defaultProps = {
  title: undefined,
};

export default StoryPromoGroups;
