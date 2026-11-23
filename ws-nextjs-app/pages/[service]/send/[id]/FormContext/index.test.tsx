import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import { refreshTokensIfExpired } from '#app/lib/uasApi/tokenRefresh/tokenManager';
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

const refreshTokensMock = refreshTokensIfExpired as jest.Mock;

const createXhrMock = (openSpy: jest.Mock = jest.fn()) =>
  jest.fn(() => ({
    open: openSpy,
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    upload: { onloadstart: null, onprogress: null },
    onreadystatechange: null,
    readyState: 4,
    status: 200,
    response: { submissionId: 'test-123' },
  }));

const stubXMLHttpRequest = (openSpy?: jest.Mock) => {
  Object.defineProperty(global, 'XMLHttpRequest', {
    value: createXhrMock(openSpy),
    writable: true,
  });
};

const renderSubmitProbe = (signinRequired: boolean) =>
  act(() =>
    render(
      <FormContextProvider fields={[]} signinRequired={signinRequired}>
        <SubmitProbe />
      </FormContextProvider>,
      {
        service: 'mundo',
        idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
      },
    ),
  );

const clickSubmit = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

const waitForAsyncSubmitHandling = () =>
  new Promise<void>(resolve => {
    setTimeout(resolve, 100);
  });

const resetFormTestEnvironment = () => {
  mockMatchMedia();
  jest.clearAllMocks();
  stubXMLHttpRequest();
};

describe('FormContext submission with token refresh', () => {
  beforeEach(resetFormTestEnvironment);

  afterEach(() => {
    Reflect.deleteProperty(global, 'XMLHttpRequest');
  });

  it('Calls refreshTokensIfExpired  when form is submitted with signinRequired=true, which only refreshes if tokens are outdated', async () => {
    await renderSubmitProbe(true);

    await act(async () => {
      clickSubmit();
      await waitFor(() => {
        expect(refreshTokensMock).toHaveBeenCalledWith(true);
      });
    });
  });

  it('Does not call refreshTokensIfExpired when form is submitted if signinRequired is false', async () => {
    await renderSubmitProbe(false);

    await act(async () => {
      clickSubmit();
      await waitForAsyncSubmitHandling();
    });

    expect(refreshTokensMock).not.toHaveBeenCalled();
  });

  it('Handles token refresh rejection and shows error screen', async () => {
    refreshTokensMock.mockRejectedValueOnce(new Error('Token expired'));
    await renderSubmitProbe(true);

    await act(async () => {
      clickSubmit();
      await waitForAsyncSubmitHandling();
    });

    expect(refreshTokensMock).toHaveBeenCalled();
    await waitFor(
      () => expect(screen.getByTestId('screen')).toHaveTextContent('error'),
      { timeout: 4000 },
    );
  });
});
