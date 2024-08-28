import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import { MostReadLink, getParentColumns } from '.';
import { getItem, getItemWrapperArray } from '../../utilities/testHelpers';

describe('MostReadLink', () => {
  const pidginItem = getItem({ service: 'pidgin', withTimestamp: true });
  const persianItem = getItem({ service: 'persian' });

  it('should render ltr correctly', () => {
    const { container } = render(
      <MostReadLink
        href={pidginItem.href}
        service="pidgin"
        title={pidginItem.title}
        dir="ltr"
        size="default"
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
        href={persianItem.href}
        service="persian"
        title={persianItem.title}
        size="default"
      />,
      {
        service: 'persian',
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
        href={pidginItem.href}
        service="pidgin"
        title={pidginItem.title}
        dir="ltr"
        size="default"
      >
        {pidginItem.timestamp}
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
        service: 'pidgin',
        dir: 'ltr',
        size: 'default',
      }),
      { service: 'pidgin' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render rtl correctly with 10 items', () => {
    const { container } = render(
      getItemWrapperArray({
        numberOfItems: 10,
        service: 'persian',
        dir: 'rtl',
        size: 'default',
      }),
      { service: 'persian' },
    );
    expect(container).toMatchSnapshot();
  });

  describe('getParentColumns helper method', () => {
    it('should return null when columnLayout is oneColumn', () => {
      expect(getParentColumns('oneColumn')).toBeNull();
    });

    it('should return a value when columnLayout is not oneColumn', () => {
      expect(getParentColumns('twoColumn')).not.toBeNull();
    });
  });
});
