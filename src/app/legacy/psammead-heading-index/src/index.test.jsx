import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import { latin, arabic } from '#legacy/gel-foundations/src/scripts';
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
