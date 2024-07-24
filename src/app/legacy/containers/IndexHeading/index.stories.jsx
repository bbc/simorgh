import React from 'react';
import IndexHeadingContainer from '.';

const Component = () => (
  <IndexHeadingContainer>Index Heading</IndexHeadingContainer>
);

export default {
  title: 'Containers/Index Heading',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const IndexHeading = Component;
