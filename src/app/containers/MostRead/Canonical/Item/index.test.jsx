import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import userEvent from '@testing-library/user-event';
import { render, act } from '@testing-library/react';
import { MostReadLink, getParentColumns } from '.';
import { getItem, getItemWrapperArray } from '../../utilities';

describe('MostReadLink', () => {
  const newsItem = getItem({ service: 'news', withTimestamp: true });
  const arabicItem = getItem({ service: 'arabic' });

  shouldMatchSnapshot(
    'should render ltr correctly',
    <MostReadLink
      href={newsItem.href}
      service="news"
      script={latin}
      title={newsItem.title}
    />,
  );

  shouldMatchSnapshot(
    'should render rtl correctly',
    <MostReadLink
      dir="rtl"
      href={arabicItem.href}
      service="persian"
      script={arabic}
      title={arabicItem.title}
    />,
  );

  shouldMatchSnapshot(
    'should render with last updated date correctly',
    <MostReadLink
      href={newsItem.href}
      service="news"
      script={latin}
      title={newsItem.title}
    >
      {newsItem.timestamp}
    </MostReadLink>,
  );

  it('should call handleClick on MostReadLink click', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <MostReadLink
        href={newsItem.href}
        service="news"
        script={latin}
        title={newsItem.title}
        onClick={handleClick}
      />,
    );

    expect(handleClick).not.toHaveBeenCalled();

    act(() => userEvent.click(getByText(newsItem.title)));

    expect(handleClick).toHaveBeenCalled();
  });
});

describe('MostReadItemWrapper', () => {
  shouldMatchSnapshot(
    'should render ltr correctly with 10 items',
    getItemWrapperArray({
      numberOfItems: 10,
      service: 'news',
      script: latin,
    }).map(item => item),
  );

  shouldMatchSnapshot(
    'should render rtl correctly with 10 items',
    getItemWrapperArray({
      numberOfItems: 10,
      service: 'persian',
      script: arabic,
      dir: 'rtl',
    }).map(item => item),
  );

  describe('getParentColumns helper method', () => {
    it('should return null when columnLayout is oneColumn', () => {
      expect(getParentColumns('oneColumn')).toEqual(null);
    });
  });
});
