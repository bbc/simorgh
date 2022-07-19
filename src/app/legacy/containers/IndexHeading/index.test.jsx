import React from 'react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import IndexHeading from '.';

const IndexHeadingWithContext = (service, pageType) => (
  <ServiceContextProvider service={service}>
    <IndexHeading pageType={pageType}>Index Heading</IndexHeading>
  </ServiceContextProvider>
);

describe('Index Heading', () => {
  describe('snapshot', () => {
    shouldMatchSnapshot(
      'should render correctly for IDX',
      IndexHeadingWithContext('ukrainian'),
    );

    shouldMatchSnapshot(
      'should render rtl correctly for IDX',
      IndexHeadingWithContext('arabic'),
    );
  });
});
