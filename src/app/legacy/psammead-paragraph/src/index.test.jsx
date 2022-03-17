import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import Paragraph from './index';

describe('Paragraph', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Paragraph script={latin} service="news">
      This is text in a paragraph.
    </Paragraph>,
  );

  shouldMatchSnapshot(
    'should render correctly in dark mode',
    <Paragraph script={latin} service="news" darkMode>
      This is text in a paragraph.
    </Paragraph>,
  );

  shouldMatchSnapshot(
    'should render correctly with arabic script typography values',
    <Paragraph script={arabic} service="persian">
      بعض محتوى النص
    </Paragraph>,
  );
});
