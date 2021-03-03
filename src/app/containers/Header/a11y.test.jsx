import React, { useState } from 'react';
import { service as newsServiceConfig } from '#lib/config/services/news';
const bannerMock = require('../ConsentBanner');
const brandMock = require('../Brand');
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import HeaderContainer from './index';

const defaultToggleState = {
  navOnArticles: {
    enabled: true,
  },
  scriptLink: {
    enabled: true,
  },
  variantCookie: {
    enabled: true,
  },
};

const mockToggleDispatch = jest.fn();

jest.mock('../ConsentBanner', () => jest.fn());

jest.mock('../Brand', () => jest.fn());

brandMock.mockImplementation(({ focusRef }) => {
  return (
    <a href="#" ref={focusRef}>
      The BBC Brand
    </a>
  );
});

bannerMock.mockImplementation(({ onDismissFocusRef }) => {
  const [showBanner, setShowBanner] = useState(true);
  return showBanner ? (
    <>
      <div>Do you consent?</div>
      <button
        onClick={() => {
          console.log('click');
          setShowBanner(false);
          onDismissFocusRef.current.focus();
        }}
      >
        Yes
      </button>
    </>
  ) : null;
});

describe('a11y', () => {
  it('should focus on brand link on consent banner dismiss', async () => {
    /* eslint-disable react/prop-types */

    const HeaderContainerWithContext = ({
      pageType,
      service = 'news',
      serviceContext = newsServiceConfig,
      bbcOrigin = 'https://www.test.bbc.com',
      variant = 'default',
    }) => (
      <ToggleContext.Provider
        value={{
          toggleState: defaultToggleState,
          toggleDispatch: mockToggleDispatch,
        }}
      >
        <ServiceContext.Provider value={serviceContext[variant]}>
          <RequestContextProvider
            isAmp={false}
            pageType={pageType}
            service={service}
            statusCode={200}
            bbcOrigin={bbcOrigin}
            pathname="/pathname"
            variant={variant}
          >
            <HeaderContainer />
          </RequestContextProvider>
        </ServiceContext.Provider>
      </ToggleContext.Provider>
    );

    const { getByText } = render(
      HeaderContainerWithContext({
        pageType: FRONT_PAGE,
      }),
    );

    const brand = getByText('The BBC Brand');
    const consentYesButton = getByText('Yes');
    userEvent.click(consentYesButton);

    expect(document.activeElement).toBe(brand);
  });
});
