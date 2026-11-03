import { RequestContextProvider } from '#contexts/RequestContext';
import {
  render,
  act,
  fireEvent,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import UserZoomIntercept from '.';
import { USERZOOM_SRC } from '../UserZoomScript';

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

describe('UserZoomIntercept (ButtonIntercept)', () => {
  it('renders the button but not the script before it is clicked', async () => {
    const { container } = await act(async () =>
      render(
        <ContextWrap>
          <UserZoomIntercept />
        </ContextWrap>,
      ),
    );

    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('button[type="button"]')).toHaveTextContent(
      'Give feedback',
    );
  });

  it.each(['isAmp', 'isApp', 'isLite'])(
    'does not render anything when %s is true',
    async flag => {
      const { container } = await act(async () =>
        render(
          <ContextWrap {...{ [flag]: true }}>
            <UserZoomIntercept />
          </ContextWrap>,
        ),
      );

      expect(container.querySelector('script')).toBeNull();
      expect(container.querySelector('button')).toBeNull();
    },
  );

  it('renders the script once the button is clicked, while keeping the button', async () => {
    const { container } = await act(async () =>
      render(
        <ContextWrap>
          <UserZoomIntercept />
        </ContextWrap>,
      ),
    );

    const button = container.querySelector(
      'button[type="button"]',
    ) as HTMLButtonElement;

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(
        document.querySelector(`script[src="${USERZOOM_SRC}"]`),
      ).toBeInTheDocument();
    });

    expect(container.querySelector('button[type="button"]')).toBeTruthy();
  });
});
