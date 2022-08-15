import Component from '.';
import blocksSingleFragment from '../Headings/testHelpers';

export default {
  title: 'Containers/Visually Hidden Headline',
  Component,
};

export const VisuallyHiddenHeadline = () => (
  <Component
    type="visuallyHiddenHeadline"
    blocks={blocksSingleFragment('This is a headline.', [])}
  />
);
