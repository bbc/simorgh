import React from 'react';
import IndexHeadingContainer from '.';

// eslint-disable-next-line react/prop-types
const Component = () => (
  <IndexHeadingContainer>Index Heading</IndexHeadingContainer>
);

export default {
  title: 'Containers/Index Heading',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const IndexHeading = Component;
