import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { cyrillicAndLatin, arabic } from '@bbc/gel-foundations/scripts';
import IndexHeadingContainer from '.';

describe('Index Heading', () => {
  describe('snapshot', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <IndexHeadingContainer script={cyrillicAndLatin} service="ukrainian">
        Index Heading
      </IndexHeadingContainer>,
    );

    shouldMatchSnapshot(
      'should render rtl correctly',
      <IndexHeadingContainer script={arabic} service="persian" dir="rtl">
        Index Heading
      </IndexHeadingContainer>,
    );
  });
});
