import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import IndexHeadingContainer from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const IndexHeadingWithContext = service => (
  <ServiceContextProvider service={service}>
    <IndexHeadingContainer>Index Heading</IndexHeadingContainer>
  </ServiceContextProvider>
);

describe('Index Heading', () => {
  describe('snapshot', () => {
    shouldMatchSnapshot(
      'should render correctly',
      IndexHeadingWithContext('ukrainian'),
    );

    shouldMatchSnapshot(
      'should render rtl correctly',
      IndexHeadingWithContext('arabic'),
    );
  });
});
