import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import IndexHeadingContainer from '.';

describe('Index Heading', () => {
  describe('snapshot', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <IndexHeadingContainer script={cyrillicAndLatin} service="ukrainian">
        Index Heading
      </IndexHeadingContainer>,
    );
  });
});
