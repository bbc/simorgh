import useServiceWorkerRegistration from '#app/hooks/useServiceWorkerRegistration';
import useSendPWAStatus from '#app/hooks/useSendPWAStatus';
import useIsPWA from '#app/hooks/useIsPWA';
import isLocal from '#app/lib/utilities/isLocal';
import ServiceWorkerContainer from './index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { render } from '../react-testing-library-with-providers';

jest.mock('#app/hooks/useServiceWorkerRegistration', () => jest.fn());
jest.mock('#app/hooks/useSendPWAStatus', () => jest.fn());
jest.mock('#app/hooks/useIsPWA', () => jest.fn());
jest.mock('#app/lib/utilities/isLocal', () => jest.fn());

const contextStub = {
  swPath: '/sw.js',
  service: 'news',
};

describe('ServiceWorkerContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useIsPWA as jest.Mock).mockReturnValue(false);
    (isLocal as jest.Mock).mockReturnValue(true);
  });

  describe('Canonical', () => {
    it('calls service worker registration hook with service and swPath', () => {
      render(
        // @ts-expect-error only require a subset of properties on service context for testing purposes
        <ServiceContext.Provider value={contextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );

      expect(useServiceWorkerRegistration).toHaveBeenCalledWith({
        service: 'news',
        swPath: '/sw.js',
      });
    });

    it.each`
      swPath       | service      | expected
      ${undefined} | ${'news'}    | ${{ service: 'news', swPath: undefined }}
      ${null}      | ${'news'}    | ${{ service: 'news', swPath: undefined }}
      ${''}        | ${'news'}    | ${{ service: 'news', swPath: undefined }}
      ${'/sw.js'}  | ${undefined} | ${{ service: undefined, swPath: undefined }}
      ${undefined} | ${undefined} | ${{ service: undefined, swPath: undefined }}
    `(
      'calls service worker registration hook with undefined values when swPath or service is missing (swPath: $swPath, service: $service)',
      ({ swPath, service, expected }) => {
        render(
          // @ts-expect-error only require a subset of properties on service context for testing purposes
          <ServiceContext.Provider value={{ swPath, service }}>
            <ServiceWorkerContainer />
          </ServiceContext.Provider>,
        );
        expect(useServiceWorkerRegistration).toHaveBeenCalledWith(expected);
      },
    );
  });

  describe('Amp', () => {
    it('is enabled when swPath has a value and not on local environment', () => {
      (isLocal as jest.Mock).mockImplementationOnce(() => false);

      const { container } = render(
        // @ts-expect-error only require a subset of properties on service context for testing purposes
        <ServiceContext.Provider value={{ ...contextStub }}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
        { isAmp: true },
      );

      expect(
        container.querySelector('amp-install-serviceworker'),
      ).toBeInTheDocument();
    });

    describe('is disabled', () => {
      it.each`
        swPath       | isLocalEnv | reason
        ${undefined} | ${false}   | ${'swPath is undefined'}
        ${undefined} | ${false}   | ${'swPath is null'}
        ${''}        | ${false}   | ${'swPath is empty'}
      `(
        'when swPath is $swPath and isLocalEnv is $isLocalEnv because $reason',
        ({ swPath, isLocalEnv }) => {
          (isLocal as jest.Mock).mockImplementationOnce(() => isLocalEnv);

          const { container } = render(
            // @ts-expect-error only require a subset of properties on service context for testing purposes
            <ServiceContext.Provider value={{ ...contextStub, swPath }}>
              <ServiceWorkerContainer />
            </ServiceContext.Provider>,
            { isAmp: true },
          );

          expect(
            container.querySelector('amp-install-serviceworker'),
          ).not.toBeInTheDocument();
        },
      );
    });
  });

  describe('PWA', () => {
    it('calls useSendPWAStatus with true when PWA is installed', () => {
      (useIsPWA as jest.Mock).mockReturnValue(true);

      render(
        // @ts-expect-error only require a subset of properties on service context for testing purposes
        <ServiceContext.Provider value={contextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );

      expect(useSendPWAStatus).toHaveBeenCalledWith(true);
    });

    it('calls useSendPWAStatus with false when PWA is not installed', () => {
      (useIsPWA as jest.Mock).mockReturnValue(false);

      render(
        // @ts-expect-error only require a subset of properties on service context for testing purposes
        <ServiceContext.Provider value={contextStub}>
          <ServiceWorkerContainer />
        </ServiceContext.Provider>,
      );

      expect(useSendPWAStatus).toHaveBeenCalledWith(false);
    });
  });
});
