import React from 'react';
import Grid from '@bbc/psammead-grid';
import { node, arrayOf, shape, any } from 'prop-types';
import {
  topStoryColumns,
  leadingStoryColumns,
  regularStoryColumns,
} from './storyColumns';

export const TopRow = ({ story }) => (
  <Grid item columns={topStoryColumns}>
    {story}
  </Grid>
);

TopRow.propTypes = {
  story: node.isRequired,
};

export const LeadingRow = ({ leadingStory, regularStory }) => (
  <>
    <Grid item columns={leadingStoryColumns}>
      {leadingStory}
    </Grid>
    <Grid item columns={regularStoryColumns}>
      {regularStory}
    </Grid>
  </>
);

LeadingRow.propTypes = {
  leadingStory: node.isRequired,
  regularStory: node.isRequired,
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
