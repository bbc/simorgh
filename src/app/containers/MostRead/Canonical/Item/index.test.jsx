import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import { MostReadLink, getParentColumns } from '.';
import { getItem, getItemWrapperArray } from '../../utilities';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';

// eslint-disable-next-line react/prop-types
const WithContexts = ({ children }) => (
  <ServiceContextProvider service="pidgin">
    <ToggleContextProvider
      toggles={{
        eventTracking: { enabled: true },
      }}
    >
      {children}
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('MostReadLink', () => {
  const newsItem = getItem({ service: 'news', withTimestamp: true });
  const arabicItem = getItem({ service: 'arabic' });

  shouldMatchSnapshot(
    'should render ltr correctly',
    <WithContexts>
      <MostReadLink
        href={newsItem.href}
        service="news"
        script={latin}
        title={newsItem.title}
      />
    </WithContexts>,
  );

  shouldMatchSnapshot(
    'should render rtl correctly',
    <WithContexts>
      <MostReadLink
        dir="rtl"
        href={arabicItem.href}
        service="persian"
        script={arabic}
        title={arabicItem.title}
      />
    </WithContexts>,
  );

  shouldMatchSnapshot(
    'should render with last updated date correctly',
    <WithContexts>
      <MostReadLink
        href={newsItem.href}
        service="news"
        script={latin}
        title={newsItem.title}
      >
        {newsItem.timestamp}
      </MostReadLink>
    </WithContexts>,
  );
});

describe('MostReadItemWrapper', () => {
  shouldMatchSnapshot(
    'should render ltr correctly with 10 items',
    getItemWrapperArray({
      numberOfItems: 10,
      service: 'news',
      script: latin,
    }),
  );

  shouldMatchSnapshot(
    'should render rtl correctly with 10 items',
    getItemWrapperArray({
      numberOfItems: 10,
      service: 'persian',
      script: arabic,
      dir: 'rtl',
    }),
  );

  describe('getParentColumns helper method', () => {
    it('should return null when columnLayout is oneColumn', () => {
      expect(getParentColumns('oneColumn')).toEqual(null);
    });
  });
});
