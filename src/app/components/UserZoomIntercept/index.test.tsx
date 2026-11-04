import { RequestContextProvider } from '#contexts/RequestContext';
import {
  render,
  act,
  fireEvent,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import UserZoomIntercept from '.';

const USERZOOM_SRC =
  'https://cdn4.userzoom.com/files/js/QzI4NFQx.js?t=uz_til&cuid=286685F149F6DF1188490022196C4538';

const ContextWrap = ({
  children,
  isAmp = false,
  isApp = false,
  isLite = false,
}: {
  children: React.ReactNode;
  isAmp?: boolean;
  isApp?: boolean;
  isLite?: boolean;
}) => (
  <RequestContextProvider
    pageType="article"
    service="pidgin"
    pathname="/pathname"
    isAmp={isAmp}
    isApp={isApp}
    isLite={isLite}
  >
    {children}
  </RequestContextProvider>
);

const observers = new Map();

const IntersectionObserver = jest.fn(callback => {
  const item = {
    callback,
    elements: new Set(),
  };

  const instance = {
    observe: jest.fn(element => {
      item.elements.add(element);
    }),
    disconnect: jest.fn(() => {
      item.elements.clear();
    }),
  };

  observers.set(instance, item);

  return instance;
});

const getObserverItem = (element: Element) => {
  const item = Array.from(observers.values()).find(({ elements }) =>
    elements.has(element),
  );

  if (!item) {
    throw new Error('Failed to find IntersectionObserver for element.');
  }

  return item;
};

beforeEach(() => {
  jest.clearAllMocks();
  observers.clear();
  // @ts-expect-error mocking required for tests
  global.IntersectionObserver = IntersectionObserver;
});

describe('UserZoomIntercept', () => {
  it('renders the script immediately by default', async () => {
    await act(async () =>
      render(
        <ContextWrap>
          <UserZoomIntercept />
        </ContextWrap>,
      ),
    );

    await waitFor(() => {
      expect(
        document.querySelector(`script[src="${USERZOOM_SRC}"]`),
      ).toBeInTheDocument();
    });
  });

  it.each(['isAmp', 'isApp', 'isLite'])(
    'does not render when %s is true',
    async flag => {
      const { container } = await act(async () =>
        render(
          <ContextWrap {...{ [flag]: true }}>
            <UserZoomIntercept />
          </ContextWrap>,
        ),
      );

      expect(container.querySelector('script')).toBeNull();
    },
  );

  it('does not render the script before the view trigger marker intersects', async () => {
    const { container } = await act(async () =>
      render(
        <ContextWrap>
          <UserZoomIntercept trigger="view" />
        </ContextWrap>,
      ),
    );

    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('span[aria-hidden="true"]')).toBeTruthy();
  });

  it('renders the script once the view trigger marker intersects', async () => {
    const { container } = await act(async () =>
      render(
        <ContextWrap>
          <UserZoomIntercept trigger="view" />
        </ContextWrap>,
      ),
    );

    const marker = container.querySelector(
      'span[aria-hidden="true"]',
    ) as HTMLElement;
    const { callback } = getObserverItem(marker);

    act(() => {
      callback([{ isIntersecting: true }]);
    });

    await waitFor(() => {
      expect(
        document.querySelector(`script[src="${USERZOOM_SRC}"]`),
      ).toBeInTheDocument();
    });
  });

  it('does not render the script before the click target is clicked', async () => {
    const targetRef = { current: document.createElement('button') };

    const { container } = await act(async () =>
      render(
        <ContextWrap>
          <UserZoomIntercept trigger="click" targetRef={targetRef} />
        </ContextWrap>,
      ),
    );

    expect(container.querySelector('script')).toBeNull();
  });

  it('renders the script once the click target is clicked', async () => {
    const targetRef = { current: document.createElement('button') };

    await act(async () =>
      render(
        <ContextWrap>
          <UserZoomIntercept trigger="click" targetRef={targetRef} />
        </ContextWrap>,
      ),
    );

    fireEvent.click(targetRef.current);

    await waitFor(() => {
      expect(
        document.querySelector(`script[src="${USERZOOM_SRC}"]`),
      ).toBeInTheDocument();
    });
  });
});
