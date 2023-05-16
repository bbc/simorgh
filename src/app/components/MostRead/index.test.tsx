import React from 'react';
import fetchMock from 'fetch-mock';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import pidginMostReadData from '../../../../data/pidgin/mostRead/index.json';
import serbianLatMostReadData from '../../../../data/serbian/mostRead/lat.json';
import { getMostReadEndpoint } from '../../lib/utilities/getUrlHelpers/getMostReadUrls';
import {
  FRONT_PAGE,
  STORY_PAGE,
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import { render, act } from '../react-testing-library-with-providers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MostRead from '.';
import { setFreshPromoTimestamp } from './utilities/testHelpers';
import { PageTypes, Services, Variants } from '#app/models/types/global';

interface MostReadProps {
  isAmp: boolean;
  service: Services;
  variant: Variants | null;
  mostReadToggle: boolean;
  serverRenderOnAmp: boolean;
  pageType?: PageTypes;
}

const MostReadWithContext = ({
  isAmp = false,
  service,
  variant = null,
  mostReadToggle,
  serverRenderOnAmp,
  pageType = FRONT_PAGE,
}: MostReadProps) => (
  <ToggleContextProvider
    toggles={{
      mostRead: {
        enabled: mostReadToggle,
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
        <MostRead serverRenderOnAmp={serverRenderOnAmp} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

const shouldRenderMostRead = (container?: HTMLElement) =>
  expect(container?.querySelector('ol')).toBeInTheDocument();

const shouldNotRenderMostRead = (container?: HTMLElement) =>
  expect(container?.querySelector('ol')).not.toBeInTheDocument();

const shouldRenderMostReadAmp = (container?: HTMLElement) =>
  expect(container?.querySelector('amp-script')).toBeInTheDocument();
const shouldNotRenderMostReadAmp = (container?: HTMLElement) =>
  expect(container?.querySelector('amp-script')).not.toBeInTheDocument();

describe('MostRead', () => {
  beforeEach(() => {
    fetchMock.restore();
  });
  describe('Canonical', () => {
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
          fetchMock.mock(
            getMostReadEndpoint({ service, variant }),
            // @ts-expect-error some responses are null
            dataResponse,
          );

          let container;
          await act(async () => {
            container = render(
              <MostReadWithContext
                service={service as Services}
                mostReadToggle={mostReadToggle}
                isAmp={isAmp}
                variant={variant as Variants}
                serverRenderOnAmp={serverRenderOnAmp}
              />,
            ).container;
          });

          renderExpectation(container);
        });
      },
    );
  });

  describe('AMP', () => {
    [
      {
        description: 'should render most read amp on STY page',
        service: 'mundo',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldRenderMostReadAmp,
        serverRenderOnAmp: false,
        pageType: STORY_PAGE,
      },
      {
        description: 'should render most read amp on article page',
        service: 'mundo',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldRenderMostReadAmp,
        serverRenderOnAmp: false,
        pageType: ARTICLE_PAGE,
      },
      {
        description: 'should render most read amp on STY page for PS news',
        service: 'news',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldRenderMostReadAmp,
        serverRenderOnAmp: false,
        pageType: STORY_PAGE,
      },
      {
        description: 'should render most read amp on article page for PS news',
        service: 'news',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldRenderMostReadAmp,
        serverRenderOnAmp: false,
        pageType: ARTICLE_PAGE,
      },
      {
        description: 'should render most read amp on CSP page for PS news',
        service: 'news',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldRenderMostReadAmp,
        serverRenderOnAmp: false,
        pageType: CORRESPONDENT_STORY_PAGE,
      },
      {
        description: 'should not render most read amp on front page',
        service: 'mundo',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldNotRenderMostReadAmp,
        serverRenderOnAmp: false,
        pageType: FRONT_PAGE,
      },
      {
        description:
          'should not render most read amp if serverRenderOnAmp is true',
        service: 'mundo',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldNotRenderMostReadAmp,
        serverRenderOnAmp: true,
        pageType: STORY_PAGE,
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
            container = render(
              <MostReadWithContext
                service={service as Services}
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
