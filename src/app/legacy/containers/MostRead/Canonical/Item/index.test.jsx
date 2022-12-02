import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import latin from '../../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../../components/ThemeProvider/fontScripts/arabic';
import { ServiceContextProvider } from '../../../../../contexts/ServiceContext';
import { MostReadLink, getParentColumns } from '.';
import { getItem, getItemWrapperArray } from '../../utilities';

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
