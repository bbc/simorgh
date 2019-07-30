import React from 'react';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '../../../testHelpers';
import Inline from './index';

describe('Inline', () => {
  shouldMatchSnapshot(
    'english inline span in persian service article',
    <Inline language="en" script={arabic} service="persian">
      This is text in a Inline.
    </Inline>,
  );

  shouldMatchSnapshot(
    'persian inline span in english service article',
    <Inline language="fa" script={latin} service="news">
      بعض محتوى النص
    </Inline>,
  );
});
