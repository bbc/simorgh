import React from 'react';
import { render } from '../../../../../components/react-testing-library-with-providers';
import latin from '../../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../../components/ThemeProvider/fontScripts/arabic';
import { MostReadLink, getParentColumns } from '.';
import { getItem, getItemWrapperArray } from '../../utilities';

describe('MostReadLink', () => {
  const pidginItem = getItem({ service: 'pidgin', withTimestamp: true });
  const persianItem = getItem({ service: 'persian' });

  it('should render ltr correctly', () => {
    const { container } = render(
      <MostReadLink
        href={pidginItem.href}
        service="pidgin"
        script={latin}
        title={pidginItem.title}
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
        script={arabic}
        title={persianItem.title}
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
        script={latin}
        title={pidginItem.title}
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
