import { render } from '../../../react-testing-library-with-providers';
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
        id=""
        position={0}
        isLive={false}
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
        id=""
        position={0}
        isLive={false}
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
        id=""
        position={0}
        isLive={false}
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

  it.each([
    {
      title:
        'should render a live pulse icon if the item refers to a live page',
      isLive: true,
      shouldShow: true,
    },
    {
      title:
        'should not render a live pulse icon if the item refers to a normal page',
      isLive: false,
      shouldShow: false,
    },
  ])('$title', ({ isLive, shouldShow }) => {
    const { container } = render(
      <MostReadLink
        href="https://www.bbc.com/hausa/live/c98kkrezn3jt"
        service="hausa"
        title="Placeholder title"
        dir="ltr"
        size="default"
        id=""
        position={0}
        isLive={isLive}
      />,
      {
        service: 'hausa',
        toggles: {
          eventTracking: { enabled: true },
        },
      },
    );

    const livePulse = container.querySelector(
      '[data-e2e=most-read-live-pulse]',
    );
    if (shouldShow) {
      expect(livePulse).not.toBeNull();
    } else {
      expect(livePulse).toBeNull();
    }
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
