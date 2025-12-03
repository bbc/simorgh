import React from 'react';
import HeadingsContainer from '.';
import blocksSingleFragment from './testHelpers';

const headline = blocksSingleFragment('This is a headline.', []);

const subheadline = blocksSingleFragment('This is a subheadline.', []);

const Component = ({ type, blocks }) => (
  <HeadingsContainer type={type} blocks={blocks} />
);

export default {
  title: 'Containers/Heading',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Heading = () => <Component type="headline" blocks={headline} />;
export const Subheading = () => (
  <Component type="subheadline" blocks={subheadline} />
);
