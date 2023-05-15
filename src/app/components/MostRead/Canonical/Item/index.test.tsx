import React from 'react';
import { render } from '../../../react-testing-library-with-providers';
import { MostReadLink, getParentColumns } from '.';
import { getItem, getItemWrapperArray } from '../../utilities/testHelpers';

const size = 'default';

describe('MostReadLink', () => {
  const newsItem = getItem({ service: 'news', withTimestamp: true });
  const arabicItem = getItem({ service: 'arabic', withTimestamp: false });

  it('should render ltr correctly', () => {
    const { container } = render(
      <MostReadLink
        href={newsItem.href}
        service="news"
        title={newsItem.title}
        dir="ltr"
        size={size}
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
        title={arabicItem.title}
        size={size}
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
        title={newsItem.title}
        dir="ltr"
        size={size}
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
        dir: 'ltr',
        size,
      }),
    );
    expect(container).toMatchSnapshot();
  });

  it('should render rtl correctly with 10 items', () => {
    const { container } = render(
      getItemWrapperArray({
        numberOfItems: 10,
        service: 'persian',
        dir: 'rtl',
        size,
      }),
    );
    expect(container).toMatchSnapshot();
  });

  describe('getParentColumns helper method', () => {
    it('should return null when columnLayout is oneColumn', () => {
      expect(getParentColumns('oneColumn')).toEqual(null);
    });

    it('should return a value when columnLayout is not oneColumn', () => {
      expect(getParentColumns('twoColumn')).not.toBeNull();
    });
  });
});
