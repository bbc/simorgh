import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { ServiceContextProvider } from '../contexts/ServiceContext';
import { RequestContextProvider } from '../contexts/RequestContext';
import { ToggleContextProvider } from '../contexts/ToggleContext';
import { UserContextProvider } from '../contexts/UserContext';
import { EventTrackingContextProvider } from '../contexts/EventTrackingContext';
import pageDataFixture from '../../../data/news/articles/c0g992jmmkko.json';
import ThemeProvider from './ThemeProvider';
import { Services, Variants } from '../models/types/global';

jest.mock('./ThemeProvider');

interface Props {
  children: JSX.Element | JSX.Element[];
  isAmp?: boolean;
  pageData?: any;
  pageType?: string;
  pathname?: string;
  service?: Services;
  toggles?: any;
  showAdsBasedOnLocation?: boolean;
  variant?: Variants;
}

// Uses a custom render so consumers don't need to wrap test fixtures in context and theme providers in every test suite
// https://testing-library.com/docs/react-testing-library/setup/#custom-render
const AllTheProviders: FC<Props> = ({
  children,
  isAmp = false,
  pageData = pageDataFixture,
  pageType = 'article',
  pathname = '/news/articles/c0g992jmmkko',
  service = 'news',
  toggles = {},
  variant = 'default',
  showAdsBasedOnLocation = false,
}: Props) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ToggleContextProvider toggles={toggles}>
        <ServiceContextProvider service={service} variant={variant}>
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.com"
            pageType={pageType}
            isAmp={isAmp}
            service={service}
            pathname={pathname}
            showAdsBasedOnLocation={showAdsBasedOnLocation}
          >
            <EventTrackingContextProvider pageData={pageData}>
              <UserContextProvider>{children}</UserContextProvider>
            </EventTrackingContextProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & Omit<Props, 'children'>,
) => {
  const {
    isAmp,
    pageData,
    pageType,
    pathname,
    service,
    toggles,
    variant,
    showAdsBasedOnLocation,
  } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders
        isAmp={isAmp}
        pageData={pageData}
        pageType={pageType}
        pathname={pathname}
        service={service}
        toggles={toggles}
        variant={variant}
        showAdsBasedOnLocation={showAdsBasedOnLocation}
      >
        {children}
      </AllTheProviders>
    ),
    ...options,
  });
};

export * from '@testing-library/react';
export { customRender as render };
