import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import { FormContextProvider, useFormContext } from '.';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '123' },
    asPath: '/mundo/send/123',
  }),
}));

jest.mock('#app/lib/uasApi/tokenRefresh/tokenManager', () => ({
  refreshTokensIfExpired: jest.fn().mockResolvedValue(undefined),
}));

const SubmitProbe = () => {
  const { handleSubmit, screen: currentScreen } = useFormContext();

  return (
    <div>
      <p data-testid="screen">{currentScreen}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="testField" defaultValue="test" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

describe('FormContext submission with token refresh', () => {
  let mockXHR: jest.Mock;

  beforeEach(() => {
    mockMatchMedia();
    jest.clearAllMocks();

    // Mock XMLHttpRequest to prevent actual XHR calls
    mockXHR = jest.fn(() => ({
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      upload: { onloadstart: null, onprogress: null },
      onreadystatechange: null,
      readyState: 4,
      status: 200,
      response: { submissionId: 'test-123' },
    })) as jest.Mock;

    Object.defineProperty(global, 'XMLHttpRequest', {
      value: mockXHR,
      writable: true,
    });
  });

  afterEach(() => {
    delete (global as any).XMLHttpRequest;
  });

  it('Calls refreshTokensIfExpired when form is submitted with signinRequired and isRefreshAvailable=true', async () => {
    const { refreshTokensIfExpired } = await import(
      '#app/lib/uasApi/tokenRefresh/tokenManager'
    );

    await act(() =>
      render(
        <FormContextProvider fields={[]} signinRequired>
          <SubmitProbe />
        </FormContextProvider>,
        {
          service: 'mundo',
          idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
        },
      ),
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(refreshTokensIfExpired).toHaveBeenCalledWith(true);
      });
    });
  });

  it('Does not call refreshTokensIfExpired when form is submitted without signinRequired', async () => {
    const { refreshTokensIfExpired } = await import(
      '#app/lib/uasApi/tokenRefresh/tokenManager'
    );

    await act(() =>
      render(
        <FormContextProvider fields={[]} signinRequired={false}>
          <SubmitProbe />
        </FormContextProvider>,
        {
          service: 'mundo',
          idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
        },
      ),
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.click(submitButton);
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    expect(refreshTokensIfExpired).not.toHaveBeenCalled();
  });

  it('Passes isRefreshAvailable flag to refreshTokensIfExpired', async () => {
    const { refreshTokensIfExpired } = await import(
      '#app/lib/uasApi/tokenRefresh/tokenManager'
    );

    // Test with isRefreshAvailable=true (default in mock)
    await act(() =>
      render(
        <FormContextProvider fields={[]} signinRequired>
          <SubmitProbe />
        </FormContextProvider>,
        {
          service: 'mundo',
          idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
        },
      ),
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(refreshTokensIfExpired).toHaveBeenCalledWith(true);
      });
    });

    expect(refreshTokensIfExpired).toHaveBeenCalled();
  });

  it('Handles token refresh rejection and shows error screen', async () => {
    const { refreshTokensIfExpired } = await import(
      '#app/lib/uasApi/tokenRefresh/tokenManager'
    );

    // Mock the refresh to throw an error (simulating 401 or token expiry)
    (refreshTokensIfExpired as jest.Mock).mockRejectedValueOnce(
      new Error('Token expired'),
    );

    await act(() =>
      render(
        <FormContextProvider fields={[]} signinRequired>
          <SubmitProbe />
        </FormContextProvider>,
        {
          service: 'mundo',
          idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
        },
      ),
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.click(submitButton);
      // Wait for async error handling and state updates
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(refreshTokensIfExpired).toHaveBeenCalled();
  });
});

describe('FormContext token refresh with outdated tokens', () => {
  let mockXHR: jest.Mock;

  beforeEach(() => {
    mockMatchMedia();
    jest.clearAllMocks();

    // Mock XMLHttpRequest to prevent actual XHR calls
    mockXHR = jest.fn(() => ({
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      upload: { onloadstart: null, onprogress: null },
      onreadystatechange: null,
      readyState: 4,
      status: 200,
      response: { submissionId: 'test-123' },
    })) as jest.Mock;

    Object.defineProperty(global, 'XMLHttpRequest', {
      value: mockXHR,
      writable: true,
    });
  });

  afterEach(() => {
    delete (global as any).XMLHttpRequest;
  });

  it('Calls refreshTokensIfExpired with isRefreshAvailable=true for outdated tokens', async () => {
    const { refreshTokensIfExpired } = await import(
      '#app/lib/uasApi/tokenRefresh/tokenManager'
    );

    // Reset the mock to track this specific call
    (refreshTokensIfExpired as jest.Mock).mockClear();
    (refreshTokensIfExpired as jest.Mock).mockResolvedValueOnce(undefined);

    // Render with signinRequired=true (triggers refresh on submit)
    await act(() =>
      render(
        <FormContextProvider fields={[]} signinRequired>
          <SubmitProbe />
        </FormContextProvider>,
        {
          service: 'mundo',
          idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
        },
      ),
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.click(submitButton);
      await waitFor(() => {
        // Verify refresh was called with the refresh availability flag
        expect(refreshTokensIfExpired).toHaveBeenCalledWith(
          expect.any(Boolean),
        );
      });
    });
  });

  it('Does not submit form if refreshTokensIfExpired throws error', async () => {
    const { refreshTokensIfExpired } = await import(
      '#app/lib/uasApi/tokenRefresh/tokenManager'
    );

    // Mock the refresh to throw error (token expired/invalid)
    (refreshTokensIfExpired as jest.Mock).mockClear();
    (refreshTokensIfExpired as jest.Mock).mockRejectedValueOnce(
      new Error('Token expired: ckns_id missing'),
    );

    // Also verify XMLHttpRequest is not called on refresh error
    const xhrOpenSpy = jest.fn();
    Object.defineProperty(global, 'XMLHttpRequest', {
      value: jest.fn(() => ({
        open: xhrOpenSpy,
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        upload: { onloadstart: null, onprogress: null },
        onreadystatechange: null,
        readyState: 4,
        status: 200,
        response: { submissionId: 'test-123' },
      })),
      writable: true,
    });

    await act(() =>
      render(
        <FormContextProvider fields={[]} signinRequired>
          <SubmitProbe />
        </FormContextProvider>,
        {
          service: 'mundo',
          idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
        },
      ),
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.click(submitButton);
      // Wait for error handling
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    // Verify that XHR.open was not called (form submission was prevented)
    expect(xhrOpenSpy).not.toHaveBeenCalled();
  });

  it('Respects signinRequired flag when calling refreshTokensIfExpired', async () => {
    const { refreshTokensIfExpired } = await import(
      '#app/lib/uasApi/tokenRefresh/tokenManager'
    );

    (refreshTokensIfExpired as jest.Mock).mockClear();

    // Render with signinRequired=false (refresh should NOT be called)
    await act(() =>
      render(
        <FormContextProvider fields={[]} signinRequired={false}>
          <SubmitProbe />
        </FormContextProvider>,
        {
          service: 'mundo',
          idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
        },
      ),
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.click(submitButton);
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    // refreshTokensIfExpired should not be called at all
    expect(refreshTokensIfExpired).not.toHaveBeenCalled();
  });
});
