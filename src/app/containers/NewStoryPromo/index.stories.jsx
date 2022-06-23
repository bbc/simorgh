import React from 'react';
import StoryPromo from '.';

const Component = ({ promoType }) => <StoryPromo promoType={promoType} />;

export default {
  title: 'Containers/ABC',
  Component,
};

export const Leading = props => <Component promoType={'leading'} />;
export const Top = props => <Component promoType={'top'} />;
export const Regular = props => <Component promoType={'regular'} />;
export const TopStories = props => <Component promoType={'topStories'} />;
export const RelatedContent = props => (
  <Component promoType={'relatedContent'} />
);
