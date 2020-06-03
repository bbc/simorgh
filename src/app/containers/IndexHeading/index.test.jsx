import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import IndexHeading from '.';

describe('Index Heading', () => {
  describe('snapshot', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <IndexHeading script={cyrillicAndLatin} service="ukrainian">
        Index Heading
      </IndexHeading>,
    );
  });
});
