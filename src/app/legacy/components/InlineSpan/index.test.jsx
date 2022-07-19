import React from 'react';
import { latin, arabic } from '#psammead/gel-foundations/src/scripts';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
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
