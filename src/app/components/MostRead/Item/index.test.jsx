import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import { MostReadLink, MostReadRank } from '.';
import { getItem } from '../testHelpers/itemsHelper';

describe('MostReadLink', () => {
  shouldMatchSnapshot(
    'should render ltr correctly',
    <MostReadLink
      item={getItem('news')}
      service="news"
      script={latin}
      dir="ltr"
    />,
  );

  shouldMatchSnapshot(
    'should render rtl correctly',
    <MostReadLink
      item={getItem('arabic')}
      service="arabic"
      script={arabic}
      dir="rtl"
    />,
  );

  shouldMatchSnapshot(
    'should render with last updated date correctly',
    <MostReadLink
      item={getItem('news', true)}
      service="news"
      script={latin}
      dir="ltr"
    />,
  );
});

describe('MostReadRank', () => {
  shouldMatchSnapshot(
    'should render ltr correctly',
    <MostReadRank service="news" script={latin}>
      5
    </MostReadRank>,
  );

  shouldMatchSnapshot(
    'should render ltr with double digits correctly',
    <MostReadRank service="news" script={latin}>
      10
    </MostReadRank>,
  );

  shouldMatchSnapshot(
    'should render rtl correctly',
    <MostReadRank service="persian" script={arabic}>
      ۲
    </MostReadRank>,
  );
});
