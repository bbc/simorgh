import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { arabic, latin } from '@bbc/gel-foundations/scripts';
import MostRead from '.';
import { getItems } from './testHelpers/itemsHelper';

describe('MostRead', () => {
  shouldMatchSnapshot(
    'should render with ltr most read with correct dir',
    <MostRead
      items={getItems('news', 10)}
      service="news"
      script={latin}
      dir="ltr"
      header="Most Read"
    />,
  );
  shouldMatchSnapshot(
    'should render with rtl most read with correct dir',
    <MostRead
      items={getItems('arabic', 10)}
      service="arabic"
      script={arabic}
      dir="rtl"
      header="الأكثر قراءة"
    />,
  );
});
