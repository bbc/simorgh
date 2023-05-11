import React from 'react';
import { render } from '../../../react-testing-library-with-providers';
import latin from '../../../ThemeProvider/fontScripts/latin';
import arabic from '../../../ThemeProvider/fontScripts/arabic';
import { MostReadLink, getParentColumns } from '.';
import {
  getItem,
  getItemWrapperArray,
} from '../../../../legacy/containers/MostRead/utilities';

describe('MostReadLink', () => {
  const newsItem = getItem({ service: 'news', withTimestamp: true });
  const arabicItem = getItem({ service: 'arabic' });

  it('should render ltr correctly', () => {
    const { container } = render(
      <MostReadLink
        href={newsItem.href}
        service="news"
        script={latin}
        title={newsItem.title}
      />,
      {
        service: 'pidgin',
        toggles: {
          eventTracking: { enabled: true },
        },
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render rtl correctly', () => {
    const { container } = render(
      <MostReadLink
        dir="rtl"
        href={arabicItem.href}
        service="persian"
        script={arabic}
        title={arabicItem.title}
      />,
      {
        service: 'pidgin',
        toggles: {
          eventTracking: { enabled: true },
        },
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with last updated date correctly', () => {
    const { container } = render(
      <MostReadLink
        href={newsItem.href}
        service="news"
        script={latin}
        title={newsItem.title}
      >
        {newsItem.timestamp}
      </MostReadLink>,
      {
        service: 'pidgin',
        toggles: {
          eventTracking: { enabled: true },
        },
      },
    );
    expect(container).toMatchSnapshot();
  });
});

describe('MostReadItemWrapper', () => {
  it('should render ltr correctly with 10 items', () => {
    const { container } = render(
      getItemWrapperArray({
        numberOfItems: 10,
        service: 'news',
        script: latin,
      }),
    );
    expect(container).toMatchSnapshot();
  });

  it('should render rtl correctly with 10 items', () => {
    const { container } = render(
      getItemWrapperArray({
        numberOfItems: 10,
        service: 'persian',
        script: arabic,
        dir: 'rtl',
      }),
    );
    expect(container).toMatchSnapshot();
  });

  describe('getParentColumns helper method', () => {
    it('should return null when columnLayout is oneColumn', () => {
      expect(getParentColumns('oneColumn')).toEqual(null);
    });
  });
});
