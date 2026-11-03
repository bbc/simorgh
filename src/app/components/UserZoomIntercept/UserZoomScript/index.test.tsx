import { RequestContextProvider } from '#contexts/RequestContext';
import { render } from '#app/components/react-testing-library-with-providers';
import UserZoomScript, { USERZOOM_SRC } from '.';

const mockScript = jest.fn(() => null);

jest.mock('next/script', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => mockScript(props),
}));

const ContextWrap = ({
  children,
  nonce = null,
}: {
  children: React.ReactNode;
  nonce?: string | null;
}) => (
  <RequestContextProvider
    pageType="article"
    service="pidgin"
    pathname="/pathname"
    nonce={nonce}
  >
    {children}
  </RequestContextProvider>
);

describe('UserZoomScript', () => {
  afterEach(() => {
    mockScript.mockClear();
  });

  it('renders the UserZoom script with the lazyOnload strategy', () => {
    render(
      <ContextWrap>
        <UserZoomScript />
      </ContextWrap>,
    );

    expect(mockScript).toHaveBeenCalledWith(
      expect.objectContaining({
        src: USERZOOM_SRC,
        strategy: 'lazyOnload',
      }),
    );
  });

  it('passes the nonce from RequestContext to the script', () => {
    render(
      <ContextWrap nonce="test-nonce">
        <UserZoomScript />
      </ContextWrap>,
    );

    expect(mockScript).toHaveBeenCalledWith(
      expect.objectContaining({ nonce: 'test-nonce' }),
    );
  });

  it('passes an undefined nonce when RequestContext has no nonce', () => {
    render(
      <ContextWrap>
        <UserZoomScript />
      </ContextWrap>,
    );

    expect(mockScript).toHaveBeenCalledWith(
      expect.objectContaining({ nonce: undefined }),
    );
  });
});
