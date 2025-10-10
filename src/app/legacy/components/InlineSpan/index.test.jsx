import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import Inline from './index';

describe('Inline', () => {
  shouldMatchSnapshot(
    'english inline span in persian service article',
    <Inline lang="en">This is text in a Inline.</Inline>,
  );

  shouldMatchSnapshot(
    'persian inline span in english service article',
    <Inline lang="fa">بعض محتوى النص</Inline>,
  );
});
