import React from 'react';
import { arrayOf, shape, node, bool } from 'prop-types';
import frontPageGroup from '#models/propTypes/frontPageGroup';
import { Grid, GridItemConstrainedLarge } from '#lib/styledGrid';
import FrontPageSection from '../FrontPageSection';
import Title from './Title';

const Index = ({ groups, title, hideTitle }) => (
  <Grid>
    <GridItemConstrainedLarge>
      <Title isVisuallyHidden={hideTitle}>{title}</Title>
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

Index.propTypes = {
  groups: arrayOf(shape(frontPageGroup)).isRequired,
  title: node.isRequired,
  hideTitle: bool,
};

Index.defaultProps = {
  hideTitle: false,
};

export default Index;
