import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import LinkData from '.';

describe('LinkData', () => {
  const props = { seoHeadline: 'nope', type: 'article' };

  shouldMatchSnapshot(
    'should correctly render for an error',
    <LinkData {...props} />,
  );
});
