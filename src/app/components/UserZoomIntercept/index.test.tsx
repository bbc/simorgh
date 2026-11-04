import { RequestContextProvider } from '#contexts/RequestContext';
import {
  render,
  act,
  fireEvent,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import {
  UserZoomClickIntercept,
  UserZoomImmediateIntercept,
  UserZoomViewIntercept,
} from '.';
import { USERZOOM_SRC } from '../UserZoomIntercept/UserZoomScript';

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

describe('UserZoomImmediateIntercept', () => {
  it('renders the UserZoom script immediately', async () => {
    await act(async () =>
      render(
        <ContextWrap>
          <UserZoomImmediateIntercept />
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
            <UserZoomImmediateIntercept />
          </ContextWrap>,
        ),
      );

      expect(container.querySelector('script')).toBeNull();
    },
  );
});

describe('UserZoomViewIntercept', () => {
  it('renders the script once its marker scrolls into view', async () => {
    const { container } = await act(async () =>
      render(
        <ContextWrap>
          <UserZoomViewIntercept />
        </ContextWrap>,
      ),
    );

    expect(container.querySelector('script')).toBeNull();
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

  it.each(['isAmp', 'isApp', 'isLite'])(
    'does not render when %s is true',
    async flag => {
      const { container } = await act(async () =>
        render(
          <ContextWrap {...{ [flag]: true }}>
            <UserZoomViewIntercept />
          </ContextWrap>,
        ),
      );

      expect(container.querySelector('script')).toBeNull();
      expect(container.querySelector('span')).toBeNull();
    },
  );
});

describe('UserZoomClickIntercept', () => {
  it('renders the script when its feedback button is clicked', async () => {
    const { container } = render(
      <ContextWrap>
        <UserZoomClickIntercept />
      </ContextWrap>,
    );

    const button = container.querySelector(
      'button[type="button"]',
    ) as HTMLButtonElement;
    expect(button).toHaveTextContent('Give feedback');
    expect(container.querySelector('script')).toBeNull();

    fireEvent.click(button);

    await waitFor(() => {
      expect(
        document.querySelector(`script[src="${USERZOOM_SRC}"]`),
      ).toBeInTheDocument();
    });
    expect(container.querySelector('button[type="button"]')).toBe(button);
  });

  it.each(['isAmp', 'isApp', 'isLite'])(
    'does not render when %s is true',
    flag => {
      const { container } = render(
        <ContextWrap {...{ [flag]: true }}>
          <UserZoomClickIntercept />
        </ContextWrap>,
      );

      expect(container.querySelector('script')).toBeNull();
      expect(container.querySelector('button')).toBeNull();
    },
  );
});
