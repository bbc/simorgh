import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { ServiceContextProvider } from '../contexts/ServiceContext';
import { RequestContextProvider } from '../contexts/RequestContext';
import { ToggleContextProvider } from '../contexts/ToggleContext';
import { UserContextProvider } from '../contexts/UserContext';
import { EventTrackingContextProvider } from '../contexts/EventTrackingContext';
import pageDataFixture from '../../../data/news/articles/c0g992jmmkko.json';
import defaultATIData from '../contexts/EventTrackingContext/index.test';
import ThemeProvider from './ThemeProvider';
import { PageTypes, Services, Toggles, Variants } from '../models/types/global';

jest.mock('./ThemeProvider');

interface Props {
  children: JSX.Element | JSX.Element[];
  isAmp?: boolean;
  isApp?: boolean;
  pageData?: object;
  atiData?: {
    analytics: {
      contentId: string;
      contentType: string;
      pageIdentifier: string;
    };
    title: string;
  };
  pageType?: PageTypes;
  derivedPageType?: string | null;
  pathname?: string;
  service?: Services;
  toggles?: Toggles;
  showAdsBasedOnLocation?: boolean;
  variant?: Variants;
  isNextJs?: boolean; // Add the isNextJs prop
}

const AllTheProviders: FC<Props> = ({
  children,
  isAmp = false,
  isApp = false,
  pageData = pageDataFixture,
  atiData = defaultATIData,
  pageType = 'article',
  derivedPageType,
  pathname = '/news/articles/c0g992jmmkko',
  service = 'news',
  toggles = {},
  variant = 'default',
  showAdsBasedOnLocation = false,
  isNextJs = false, // Assign the isNextJs prop a default value
}: Props) => {
  return (
    <ToggleContextProvider toggles={toggles}>
      <ServiceContextProvider service={service} variant={variant}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.com"
          pageType={pageType}
          isAmp={isAmp}
          isApp={isApp}
          isNextJs={isNextJs} // Pass the isNextJs prop to the RequestContextProvider
          service={service}
          pathname={pathname}
          derivedPageType={derivedPageType}
          showAdsBasedOnLocation={showAdsBasedOnLocation}
        >
          <EventTrackingContextProvider data={pageData} atiData={atiData}>
            <UserContextProvider>
              <ThemeProvider service={service} variant={variant}>
                {children}
              </ThemeProvider>
            </UserContextProvider>
          </EventTrackingContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & Omit<Props, 'children'>,
) => {
  const {
    isAmp,
    isApp,
    pageData,
    pageType,
    atiData,
    derivedPageType,
    pathname,
    service,
    toggles,
    variant,
    showAdsBasedOnLocation,
    isNextJs, // Add the isNextJs prop
  } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders
        isAmp={isAmp}
        isApp={isApp}
        pageData={pageData}
        atiData={atiData}
        pageType={pageType}
        derivedPageType={derivedPageType}
        pathname={pathname}
        service={service}
        toggles={toggles}
        variant={variant}
        showAdsBasedOnLocation={showAdsBasedOnLocation}
        isNextJs={isNextJs} // Pass the isNextJs prop to the AllTheProviders component
      >
        {children}
      </AllTheProviders>
    ),
    ...options,
  });
};

export * from '@testing-library/react';
export { customRender as render };
