import React from 'react';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import Inline from './index';

describe('Inline', () => {
  shouldMatchSnapshot(
    'english inline span in persian service article',
    <Inline lang="en" script={arabic} service="persian">
      This is text in a Inline.
    </Inline>,
  );

  shouldMatchSnapshot(
    'persian inline span in english service article',
    <Inline lang="fa" script={latin} service="news">
      بعض محتوى النص
    </Inline>,
  );
});
