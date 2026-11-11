import { createRef } from 'react';
import userEvent from '@testing-library/user-event';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import { act, render, screen } from '../react-testing-library-with-providers';
import CallToActionLink, { GLOW_DELAY_MS } from '.';

jest.mock('#app/hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useClickTrackerHandler'),
}));

type MockIntersectionObserver = {
  observe: jest.Mock;
  disconnect: jest.Mock;
};

const originalIntersectionObserver = global.IntersectionObserver;
let intersectionCallback: IntersectionObserverCallback;
let observer: MockIntersectionObserver;

const intersectionObserver = jest.fn(
  (callback: IntersectionObserverCallback) => {
    intersectionCallback = callback;
    observer = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    };

    return observer as unknown as IntersectionObserver;
  },
);

const triggerIntersection = ({
  intersectionRatio,
  isIntersecting = true,
}: {
  intersectionRatio: number;
  isIntersecting?: boolean;
}) => {
  intersectionCallback(
    [
      {
        intersectionRatio,
        isIntersecting,
      } as IntersectionObserverEntry,
    ],
    observer as unknown as IntersectionObserver,
  );
};

describe('Call To Action Link', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render child elements', () => {
    const { container } = render(
      <CallToActionLink url="https://www.bbc.com/ws/languages">
        <CallToActionLink.ButtonLikeWrapper>
          <CallToActionLink.Text>My Link Text</CallToActionLink.Text>
          <CallToActionLink.Chevron />
        </CallToActionLink.ButtonLikeWrapper>
      </CallToActionLink>,
    );
    const link = screen.getByText('My Link Text');
    const [chevron] = container.getElementsByTagName('svg');
    expect(link).toBeInTheDocument();
    expect(chevron).toBeInTheDocument();
  });

  it('should preserve component and consumer classes', () => {
    const { container } = render(
      <CallToActionLink
        url="https://www.bbc.com/ws/languages"
        alignWithMargin
        className="custom-link"
      >
        <CallToActionLink.ButtonLikeWrapper className="custom-wrapper">
          <CallToActionLink.Text className="custom-text">
            My Link Text
          </CallToActionLink.Text>
          <CallToActionLink.Chevron className="custom-chevron" />
        </CallToActionLink.ButtonLikeWrapper>
      </CallToActionLink>,
    );

    const link = screen.getByRole('link');
    const text = screen.getByText('My Link Text');
    const [chevron] = container.getElementsByTagName('svg');

    expect(link).toHaveClass('link', 'alignWithMargin', 'custom-link');
    expect(text).toHaveClass('text', 'defaultTextStyles', 'custom-text');
    expect(text.parentElement).toHaveClass('flexWrapper', 'custom-wrapper');
    expect(chevron).toHaveClass('chevron', 'picaSize', 'custom-chevron');
  });

  it('should render a link with the correct href', () => {
    render(
      <CallToActionLink url="https://www.bbc.com/ws/languages">
        <CallToActionLink.Text>My Link Text</CallToActionLink.Text>
      </CallToActionLink>,
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toEqual(
      'https://www.bbc.com/ws/languages',
    );
  });

  it('should not render if no url is supplied', () => {
    const { container } = render(
      // @ts-expect-error Missing attributes
      <CallToActionLink>
        <CallToActionLink.Text>My Link Text</CallToActionLink.Text>
      </CallToActionLink>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should register click tracker if event tracking data provided', () => {
    const eventTrackingData = { componentName: 'call-to-action-link' };
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

    render(
      <CallToActionLink
        url="https://www.bbc.com/ws/languages"
        eventTrackingData={eventTrackingData}
      >
        <CallToActionLink.Text>
          My Link Text
          <CallToActionLink.Chevron />
        </CallToActionLink.Text>
      </CallToActionLink>,
    );

    expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
  });

  it(`Should permit custom attributes through html attributes`, () => {
    render(
      <CallToActionLink
        url="https://www.bbc.com/ws/languages"
        {...{ 'data-ignore-lite': true }}
      >
        <CallToActionLink.Text>My Link Text</CallToActionLink.Text>
        <CallToActionLink.Chevron />
      </CallToActionLink>,
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('data-ignore-lite')).toBeTruthy();
  });

  it('should merge a passed className onto the link', () => {
    render(
      <CallToActionLink
        url="https://www.bbc.com/ws/languages"
        className="consumer-class"
      >
        <CallToActionLink.Text>My Link Text</CallToActionLink.Text>
      </CallToActionLink>,
    );

    expect(screen.getByRole('link')).toHaveClass('consumer-class');
  });

  it('should not add a "false" class when alignWithMargin is not set', () => {
    render(
      <CallToActionLink url="https://www.bbc.com/ws/languages">
        <CallToActionLink.Text>My Link Text</CallToActionLink.Text>
      </CallToActionLink>,
    );

    expect(screen.getByRole('link')).not.toHaveClass('false');
  });

  it('should merge a passed className onto the text and chevron', () => {
    const { container } = render(
      <CallToActionLink url="https://www.bbc.com/ws/languages">
        <CallToActionLink.Text className="text-consumer-class">
          My Link Text
          <CallToActionLink.Chevron className="chevron-consumer-class" />
        </CallToActionLink.Text>
      </CallToActionLink>,
    );

    expect(screen.getByText('My Link Text')).toHaveClass('text-consumer-class');
    expect(container.querySelector('svg')).toHaveClass(
      'chevron-consumer-class',
    );
  });

  describe('glow', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
      global.IntersectionObserver = intersectionObserver;
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
      global.IntersectionObserver = originalIntersectionObserver;
    });

    const renderGlowLink = () =>
      render(
        <CallToActionLink url="https://www.bbc.com/ws/languages" enableGlow>
          <CallToActionLink.ButtonLikeWrapper>
            <CallToActionLink.Text>My Link Text</CallToActionLink.Text>
          </CallToActionLink.ButtonLikeWrapper>
        </CallToActionLink>,
      );

    it('triggers the glow after delay at the visibility threshold', () => {
      const { container } = renderGlowLink();
      const wrapper = container.querySelector('a > div');

      act(() => {
        triggerIntersection({ intersectionRatio: 0.5 });
      });

      act(() => {
        jest.advanceTimersByTime(GLOW_DELAY_MS - 1);
      });
      expect(wrapper).not.toHaveClass('glow');

      act(() => {
        jest.advanceTimersByTime(1);
      });

      expect(wrapper).toHaveClass('glow');
      expect(observer.disconnect).toHaveBeenCalledTimes(1);
    });

    it('cancels the timer when the CTA leaves the visibility threshold', () => {
      const { container } = renderGlowLink();
      const wrapper = container.querySelector('a > div');

      act(() => {
        triggerIntersection({ intersectionRatio: 0.5 });
      });

      act(() => {
        jest.advanceTimersByTime(GLOW_DELAY_MS - 1000);
      });

      act(() => {
        triggerIntersection({ intersectionRatio: 0.49 });
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(wrapper).not.toHaveClass('glow');

      act(() => {
        triggerIntersection({ intersectionRatio: 0.5 });
      });

      act(() => {
        jest.advanceTimersByTime(GLOW_DELAY_MS);
      });

      expect(wrapper).toHaveClass('glow');
    });

    it('cancels a pending glow when the link receives keyboard focus', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const { container } = renderGlowLink();
      const wrapper = container.querySelector('a > div');

      act(() => {
        triggerIntersection({ intersectionRatio: 0.5 });
      });

      await user.tab();

      act(() => {
        jest.advanceTimersByTime(GLOW_DELAY_MS);
      });

      expect(wrapper).not.toHaveClass('glow');
    });

    it('permanently removes a finished glow after keyboard focus', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const { container } = renderGlowLink();
      const wrapper = container.querySelector('a > div');

      act(() => {
        triggerIntersection({ intersectionRatio: 0.5 });
      });

      act(() => {
        jest.advanceTimersByTime(GLOW_DELAY_MS);
      });
      expect(wrapper).toHaveClass('glow');

      await user.tab();
      expect(wrapper).not.toHaveClass('glow');

      await user.tab();
      expect(wrapper).not.toHaveClass('glow');
    });

    it('does not observe or glow unless enabled', () => {
      const { container } = render(
        <CallToActionLink url="https://www.bbc.com/ws/languages">
          <CallToActionLink.ButtonLikeWrapper>
            <CallToActionLink.Text>My Link Text</CallToActionLink.Text>
          </CallToActionLink.ButtonLikeWrapper>
        </CallToActionLink>,
      );

      expect(intersectionObserver).not.toHaveBeenCalled();
      expect(container.querySelector('a > div')).not.toHaveClass('glow');
    });

    it('preserves a supplied ref while observing the CTA', () => {
      const ref = createRef<HTMLAnchorElement>();

      render(
        <CallToActionLink
          url="https://www.bbc.com/ws/languages"
          enableGlow
          ref={ref}
        >
          <CallToActionLink.ButtonLikeWrapper>
            <CallToActionLink.Text>My Link Text</CallToActionLink.Text>
          </CallToActionLink.ButtonLikeWrapper>
        </CallToActionLink>,
      );

      expect(ref.current).toBe(screen.getByRole('link'));
    });
  });
});
