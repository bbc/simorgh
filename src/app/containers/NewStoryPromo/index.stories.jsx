import React from 'react';
import StoryPromo from '.';
import topStoriesRtl from '#pages/StoryPage/topStoriesRtl.json';

const Component = ({ promoType }) => <StoryPromo promoType={promoType} />;

export default {
  title: 'Containers/ABC',
  Component,
};

export const TopStories = props => <Component content={topStoriesRtl} />;
export const RelatedContent = props => <Component content={topStoriesRtl} />;
