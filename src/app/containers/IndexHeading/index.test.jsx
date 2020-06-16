import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import IndexHeading from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const IndexHeadingWithContext = (service, pageType) => (
  <ServiceContextProvider service={service}>
    <IndexHeading pageType={pageType}>Index Heading</IndexHeading>
  </ServiceContextProvider>
);

describe('Index Heading', () => {
  describe('snapshot', () => {
    shouldMatchSnapshot(
      'should render correctly for Most Read',
      IndexHeadingWithContext('ukrainian', 'mostRead'),
    );

    shouldMatchSnapshot(
      'should render correctly for IDX',
      IndexHeadingWithContext('ukrainian', 'idx'),
    );

    shouldMatchSnapshot(
      'should render rtl correctly for IDX',
      IndexHeadingWithContext('arabic', 'idx'),
    );
  });
});
