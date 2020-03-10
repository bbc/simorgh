import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import HeaderContainer from './index';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { service as pidginServiceConfig } from '#lib/config/services/pidgin';
import { service as serbianServiceConfig } from '#lib/config/services/serbian';

const defaultToggleState = {
  navOnArticles: {
    enabled: true,
  },
};

const mockToggleDispatch = jest.fn();

/* eslint-disable react/prop-types */
const HeaderContainerWithContext = ({
  pageType,
  service = 'pidgin',
  serviceContext = pidginServiceConfig,
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

describe(`Header`, () => {
  shouldMatchSnapshot(
    'should render correctly for news article',
    HeaderContainerWithContext({
      pageType: 'article',
      service: 'news',
    }),
  );

  shouldMatchSnapshot(
    'should render correctly for WS frontPage',
    HeaderContainerWithContext({
      pageType: 'frontPage',
    }),
  );

  shouldMatchSnapshot(
    'should render correctly for WS radio page',
    HeaderContainerWithContext({
      pageType: 'media',
    }),
  );

  it('should output a nav bar for media asset pages', () => {
    render(HeaderContainerWithContext({ pageType: 'MAP' }));
    expect(document.querySelector(`header nav`)).not.toBeNull();
  });

  it('should output a nav bar for articles', () => {
    render(HeaderContainerWithContext({ pageType: 'article' }));
    expect(document.querySelector(`header nav`)).not.toBeNull();
  });

  it('should NOT output a nav bar for articles on live', () => {
    render(
      HeaderContainerWithContext({
        pageType: 'article',
        bbcOrigin: 'https://www.bbc.com',
      }),
    );
    expect(document.querySelector(`header nav`)).toBeNull();
  });

  it('should render a Brand with a Skip to content link, linking to #content', () => {
    render(
      HeaderContainerWithContext({
        pageType: 'frontPage',
      }),
    );

    const skipLink = document.querySelector("a[href$='#content']");
    expect(skipLink).toBeVisible();
  });

  const scriptLinkSelector = 'a[data-variant]';

  it('should not render script link for a service without variants', () => {
    render(
      HeaderContainerWithContext({
        pageType: 'frontPage',
        service: 'pidgin',
        serviceContext: pidginServiceConfig,
      }),
    );
    expect(document.querySelectorAll(scriptLinkSelector).length).toBe(0);
  });

  it('should render script link for a service with variants', () => {
    const { container } = render(
      HeaderContainerWithContext({
        pageType: 'frontPage',
        service: 'serbian',
        serviceContext: serbianServiceConfig,
        variant: 'cyr',
      }),
      {
        wrapper: MemoryRouter,
      },
    );

    expect(container.querySelectorAll(scriptLinkSelector).length).toBe(1);
  });
});
