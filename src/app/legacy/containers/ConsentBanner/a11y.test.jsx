import React, { createRef, useMemo } from 'react';
import { UserContextProvider } from '#contexts/UserContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import Cookies from 'js-cookie';
import {
  render,
  fireEvent,
} from '../../../components/react-testing-library-with-providers';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { service as pidginServiceConfig } from '../../../lib/config/services/pidgin';
import ConsentBanner from './index';

const defaultToggleState = {
  chartbeatAnalytics: {
    enabled: false,
  },
};
const mockToggleDispatch = jest.fn();

const AmpBannerWithContext = ({ service, serviceConfig, variant }) => {
  const toggleContextValue = useMemo(
    () => ({
      toggleState: defaultToggleState,
      toggleDispatch: mockToggleDispatch,
    }),
    [],
  );
  return (
    <RequestContextProvider
      isAmp
      pageType={FRONT_PAGE}
      pathname="/"
      service={service}
    >
      <ToggleContext.Provider value={toggleContextValue}>
        <UserContextProvider>
          <ServiceContext.Provider value={serviceConfig[variant]}>
            <ConsentBanner />
          </ServiceContext.Provider>
        </UserContextProvider>
      </ToggleContext.Provider>
    </RequestContextProvider>
  );
};

const CanonicalBannerWithContext = React.forwardRef(
  ({ serviceConfig, variant }, ref) => {
    const toggleContextValue = useMemo(
      () => ({
        toggleState: defaultToggleState,
        toggleDispatch: mockToggleDispatch,
      }),
      [],
    );
    return (
      <>
        <div ref={ref}>
          <a href="/">BBC Brand</a>
        </div>
        <ToggleContext.Provider value={toggleContextValue}>
          <UserContextProvider>
            <ServiceContext.Provider value={serviceConfig[variant]}>
              <ConsentBanner onDismissFocusRef={ref} />
            </ServiceContext.Provider>
          </UserContextProvider>
        </ToggleContext.Provider>
      </>
    );
  },
);

describe('canonical', () => {
  beforeEach(() => {
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
  });
  it('should focus on canonical consent banner heading on mount on canonical', () => {
    const { getByText } = render(
      <CanonicalBannerWithContext
        serviceConfig={pidginServiceConfig}
        variant="default"
      />,
    );
    const pidginPrivacyHeading =
      pidginServiceConfig.default.translations.consentBanner.privacy.title;

    expect(document.activeElement).toBe(getByText(pidginPrivacyHeading));
  });

  it('should focus on the link within the referenced element after cookie accept on canonical', () => {
    const onDismissFocusRef = createRef(null);
    const { getByText } = render(
      <CanonicalBannerWithContext
        serviceConfig={pidginServiceConfig}
        variant="default"
        ref={onDismissFocusRef}
      />,
    );

    const pidginPrivacyAccept =
      pidginServiceConfig.default.translations.consentBanner.privacy.accept;
    const pidginCookieAccept =
      pidginServiceConfig.default.translations.consentBanner.cookie.canonical
        .accept;

    fireEvent.click(getByText(pidginPrivacyAccept));
    fireEvent.click(getByText(pidginCookieAccept));

    expect(document.activeElement).toBe(getByText('BBC Brand'));
  });
});

describe('amp', () => {
  it('should render a focussable manage cookies heading on AMP', () => {
    const { container } = render(
      <AmpBannerWithContext
        service="pidgin"
        serviceConfig={pidginServiceConfig}
        variant="default"
      />,
    );

    const manageCookiesHeading = container.querySelector(
      '#manageCookiesHeading',
    );
    manageCookiesHeading.focus();

    expect(document.activeElement).toBe(manageCookiesHeading);
  });

  it('should render a focussable cookie banner heading on AMP', () => {
    const { getByText } = render(
      <AmpBannerWithContext
        service="pidgin"
        serviceConfig={pidginServiceConfig}
        variant="default"
      />,
    );

    const pidginCookieAcceptAmp =
      pidginServiceConfig.default.translations.consentBanner.cookie.amp.initial
        .title;

    const pidginCookieHeading = getByText(pidginCookieAcceptAmp);
    pidginCookieHeading.focus();

    expect(document.activeElement).toBe(pidginCookieHeading);
  });
});
