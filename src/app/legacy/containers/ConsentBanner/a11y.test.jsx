import React, { createRef, useMemo } from 'react';
import { UserContextProvider } from '#contexts/UserContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
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
  privacyPolicy: {
    enabled: true,
    value: 'july2019',
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
      pageType={HOME_PAGE}
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
  ({ serviceConfig, variant, toggleStateOverride }, ref) => {
    const toggleContextValue = useMemo(
      () => ({
        toggleState: { ...defaultToggleState, ...(toggleStateOverride || {}) },
        toggleDispatch: mockToggleDispatch,
      }),
      [toggleStateOverride],
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

  it('should focus on canonical consent privacy banner heading on mount on canonical', () => {
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

  it('should focus on canonical consent cookie banner heading on mount on canonical when privacy policy toggle is disabled', () => {
    const { getByText } = render(
      <CanonicalBannerWithContext
        serviceConfig={pidginServiceConfig}
        variant="default"
        toggleStateOverride={{
          privacyPolicy: {
            enabled: false,
          },
        }}
      />,
    );
    const pidginCookieHeading =
      pidginServiceConfig.default.translations.consentBanner.cookie.canonical
        .title;

    expect(document.activeElement).toBe(getByText(pidginCookieHeading));
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
