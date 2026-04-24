import { render, screen } from '../../../react-testing-library-with-providers';
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
      />,
      {
        service: 'pidgin',
        toggles: {
          eventTracking: { enabled: true },
        },
      },
    );

    const link = screen.getByRole('link', { name: pidginItem.title });

    expect(link).toHaveAttribute('href', pidginItem.href);
    expect(link).toHaveTextContent(pidginItem.title);
    expect(container.querySelector('div[dir="ltr"]')).not.toBeNull();
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
      />,
      {
        service: 'persian',
        toggles: {
          eventTracking: { enabled: true },
        },
      },
    );

    const link = screen.getByRole('link', { name: persianItem.title });

    expect(link).toHaveAttribute('href', persianItem.href);
    expect(link).toHaveTextContent(persianItem.title);
    expect(container.querySelector('div[dir="rtl"]')).not.toBeNull();
  });

  it('should render with last updated date correctly', () => {
    render(
      <MostReadLink
        href={pidginItem.href}
        service="pidgin"
        title={pidginItem.title}
        dir="ltr"
        size="default"
        id=""
        position={0}
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

    expect(
      screen.getByText('Last updated: 5th November 2016'),
    ).toBeInTheDocument();
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

    expect(container.querySelectorAll('div[dir="ltr"] > a[href]')).toHaveLength(
      10,
    );
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

    expect(container.querySelectorAll('div[dir="rtl"] > a[href]')).toHaveLength(
      10,
    );
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
