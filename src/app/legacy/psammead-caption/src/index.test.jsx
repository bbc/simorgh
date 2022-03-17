import React from 'react';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import Caption from '.';

describe('Caption', () => {
  shouldMatchSnapshot(
    'should render with some offscreen text',
    <Caption script={latin} service="news">
      This is some Caption text
      <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
    </Caption>,
  );

  shouldMatchSnapshot(
    'should render with some offscreen text and arabic script typography values',
    <Caption script={arabic} service="persian">
      هذا هو بعض النص التسمية التوضيحي
      <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
    </Caption>,
  );
});
