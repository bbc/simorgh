import React from 'react';
import Grid from '@bbc/psammead-grid';
import { node, arrayOf, shape, any } from 'prop-types';
import {
  topStoryColumns,
  leadingStoryColumns,
  regularStoryColumns,
} from './storyColumns';

export const TopRow = ({ stories }) => (
  <Grid item columns={topStoryColumns}>
    {stories[0].story}
  </Grid>
);

TopRow.propTypes = {
  stories: arrayOf(shape({ story: node.isRequired, id: any.isRequired }))
    .isRequired,
};

export const LeadingRow = ({ stories }) => (
  <>
    <Grid item columns={leadingStoryColumns}>
      {stories[0].story}
    </Grid>
    <Grid item columns={regularStoryColumns}>
      {stories[1].story}
    </Grid>
  </>
);

LeadingRow.propTypes = {
  stories: arrayOf(shape({ story: node.isRequired, id: any.isRequired }))
    .isRequired,
};

export const RegularRow = ({ stories }) => (
  <>
    {stories.map(story => (
      <Grid item columns={regularStoryColumns} key={story.id}>
        {story.story}
      </Grid>
    ))}
  </>
);

RegularRow.propTypes = {
  stories: arrayOf(shape({ story: node.isRequired, id: any.isRequired }))
    .isRequired,
};
