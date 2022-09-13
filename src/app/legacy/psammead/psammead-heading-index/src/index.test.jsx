import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import latin from '../../../../components/ThemeProvider/typography/scripts/latin';
import arabic from '../../../../components/ThemeProvider/typography/scripts/arabic';
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
