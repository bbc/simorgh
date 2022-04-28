import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import HeadingIndex from './index';

describe('Index Heading', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <HeadingIndex script={latin} service="news">
      This is a page heading
    </HeadingIndex>,
  );

  shouldMatchSnapshot(
    'should render correctly with arabic script typography values',
    <HeadingIndex script={arabic} service="persian">
      هذا عنوان الصفحة
    </HeadingIndex>,
  );
});
