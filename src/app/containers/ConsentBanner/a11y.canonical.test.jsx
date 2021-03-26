import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import ConsentBanner from './index';
import { UserContextProvider } from '#contexts/UserContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { service as pidginServiceConfig } from '#lib/config/services/pidgin';

const CanonicalBannerWithContext = React.forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ serviceConfig, variant }, ref) => {
    const defaultToggleState = {
      chartbeatAnalytics: {
        enabled: false,
      },
    };

    const mockToggleDispatch = jest.fn();

    return (
      <>
        <div ref={ref}>
          <a href="/">BBC Brand</a>
        </div>
        <ToggleContext.Provider
          value={{
            toggleState: defaultToggleState,
            toggleDispatch: mockToggleDispatch,
          }}
        >
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

describe('a11y', () => {
  it('should focus on canonical consent banner heading on mount', () => {
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

  it('should focus on the link within the referenced element after cookie accept', () => {
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

    getByText(pidginPrivacyAccept).click();
    getByText(pidginCookieAccept).click();

    expect(document.activeElement).toBe(getByText('BBC Brand'));
  });
});
