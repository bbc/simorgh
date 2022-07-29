import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { latin, arabic } from '#psammead/gel-foundations/src/scripts';
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
