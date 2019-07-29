import React from 'react';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '../../../testHelpers';
import Inline from './index';

describe('Inline', () => {
  shouldMatchSnapshot(
    'should render a correctly',
    <Inline language="en" script={latin} service="persian">
      This is text in a Inline.
    </Inline>,
  );

  shouldMatchSnapshot(
    'should render correctly with persian content',
    <Inline language="fa" script={arabic} service="news">
      بعض محتوى النص
    </Inline>,
  );
});
