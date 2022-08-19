import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import ThemeProvider from './ThemeProvider/themes/news';
import { ServiceContextProvider } from '../contexts/ServiceContext';
import { RequestContextProvider } from '../contexts/RequestContext';
import { ToggleContextProvider } from '../contexts/ToggleContext';
import { UserContextProvider } from '../contexts/UserContext';
import { EventTrackingContextProvider } from '../contexts/EventTrackingContext';
import fixtureData from '../../../data/news/articles/c0g992jmmkko.json';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AllTheProviders: FC<Props> = ({ children }: Props) => (
  <ThemeProvider>
    <ToggleContextProvider toggles={{}}>
      <ServiceContextProvider service="news">
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.com"
          pageType="article"
          isAmp={false}
          service="news"
          pathname="/news/articles/c0g992jmmkko"
        >
          <EventTrackingContextProvider pageData={fixtureData}>
            <UserContextProvider>{children}</UserContextProvider>
          </EventTrackingContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  </ThemeProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
