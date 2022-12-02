import React from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import pidginMostReadData from '#data/pidgin/mostRead';
import serbianLatMostReadData from '#data/serbian/mostRead/lat';
import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import {
  FRONT_PAGE,
  STORY_PAGE,
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import MostReadContainer from '.';
import { setFreshPromoTimestamp } from './utilities/testHelpers';

/* eslint-disable react/prop-types */
const MostReadWithContext = ({
  isAmp = false,
  service,
  variant = null,
  mostReadToggle,
  serverRenderOnAmp,
  pageType = FRONT_PAGE,
}) => (
  <ToggleContext.Provider
    value={{
      toggleState: {
        mostRead: { enabled: mostReadToggle },
      },
    }}
  >
    <RequestContextProvider
      bbcOrigin={`http://localhost:7080/${service}`}
      isAmp={isAmp}
      pageType={pageType}
      service={service}
      statusCode={200}
      pathname={`/${service}`}
      variant={variant}
    >
      <ServiceContextProvider service={service} variant={variant}>
        <MostReadContainer serverRenderOnAmp={serverRenderOnAmp} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContext.Provider>
);

const shouldRenderMostRead = container =>
  expect(container.querySelector('ol')).toBeInTheDocument();

const shouldNotRenderMostRead = container =>
  expect(container.querySelector('ol')).not.toBeInTheDocument();

const shouldRenderMostReadAmp = container =>
  expect(container.querySelector('amp-script')).toBeInTheDocument();
const shouldNotRenderMostReadAmp = container =>
  expect(container.querySelector('amp-script')).not.toBeInTheDocument();

describe('MostReadContainerCanonical Assertion', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  [
    {
      description: 'should render most read for pidgin with toggles on',
      service: 'pidgin',
      mostReadToggle: true,
      isAmp: false,
      variant: null,
      renderExpectation: shouldRenderMostRead,
      dataResponse: setFreshPromoTimestamp(pidginMostReadData),
      serverRenderOnAmp: false,
    },
    {
      description: 'should render most read for serbian lat with toggles on',
      service: 'serbian',
      mostReadToggle: true,
      isAmp: false,
      variant: 'lat',
      renderExpectation: shouldRenderMostRead,
      dataResponse: setFreshPromoTimestamp(serbianLatMostReadData),
      serverRenderOnAmp: false,
    },
    {
      description: 'should not render most read for pidgin with toggles off',
      service: 'pidgin',
      mostReadToggle: false,
      isAmp: false,
      variant: null,
      renderExpectation: shouldNotRenderMostRead,
      dataResponse: setFreshPromoTimestamp(pidginMostReadData),
      serverRenderOnAmp: false,
    },
    {
      description: 'should not render most read for archive',
      service: 'archive',
      mostReadToggle: true,
      isAmp: false,
      variant: null,
      renderExpectation: shouldNotRenderMostRead,
      dataResponse: null,
      serverRenderOnAmp: false,
    },
    {
      description:
        'should render most read on amp pages when initialData is passed and serverRenderOnAmp is true',
      service: 'pidgin',
      mostReadToggle: true,
      isAmp: true,
      variant: null,
      renderExpectation: shouldRenderMostRead,
      dataResponse: setFreshPromoTimestamp(pidginMostReadData),
      serverRenderOnAmp: true,
    },
    {
      description: 'should not render most read when dataResponse is empty',
      service: 'pidgin',
      mostReadToggle: true,
      isAmp: false,
      variant: null,
      renderExpectation: shouldNotRenderMostRead,
      dataResponse: null,
    },
  ].forEach(
    ({
      description,
      service,
      mostReadToggle,
      isAmp,
      variant,
      renderExpectation,
      dataResponse,
      serverRenderOnAmp,
    }) => {
      it(description, async () => {
        fetchMock.mock(getMostReadEndpoint({ service, variant }), dataResponse);

        let container;
        await act(async () => {
          container = await render(
            <MostReadWithContext
              service={service}
              mostReadToggle={mostReadToggle}
              isAmp={isAmp}
              variant={variant}
              serverRenderOnAmp={serverRenderOnAmp}
            />,
          ).container;
        });

        renderExpectation(container);
      });
    },
  );

  describe('AMP Only', () => {
    [
      {
        description: 'should render most read amp on STY page',
        service: 'mundo',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldRenderMostReadAmp,
        pageType: STORY_PAGE,
      },
      {
        description: 'should render most read amp on article page',
        service: 'mundo',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldRenderMostReadAmp,
        pageType: ARTICLE_PAGE,
      },
      {
        description: 'should render most read amp on STY page for PS news',
        service: 'news',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldRenderMostReadAmp,
        pageType: STORY_PAGE,
      },
      {
        description: 'should render most read amp on article page for PS news',
        service: 'news',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldRenderMostReadAmp,
        pageType: ARTICLE_PAGE,
      },
      {
        description: 'should render most read amp on CSP page for PS news',
        service: 'news',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldRenderMostReadAmp,
        pageType: CORRESPONDENT_STORY_PAGE,
      },
      {
        description: 'should not render most read amp on front page',
        service: 'mundo',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldNotRenderMostReadAmp,
        pageType: FRONT_PAGE,
      },
    ].forEach(
      ({
        description,
        service,
        mostReadToggle,
        isAmp,
        variant,
        renderExpectation,
        serverRenderOnAmp,
        pageType,
      }) => {
        it(description, async () => {
          let container;
          await act(async () => {
            container = await render(
              <MostReadWithContext
                service={service}
                mostReadToggle={mostReadToggle}
                isAmp={isAmp}
                variant={variant}
                serverRenderOnAmp={serverRenderOnAmp}
                pageType={pageType}
              />,
            ).container;
          });

          renderExpectation(container);
        });
      },
    );
  });
});
