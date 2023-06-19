import React from 'react';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import pidginMostReadData from '../../../../data/pidgin/mostRead/pidgin.json';
import serbianLatMostReadData from '../../../../data/serbian/mostRead/lat.json';
import {
  FRONT_PAGE,
  STORY_PAGE,
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
  HOME_PAGE,
} from '../../routes/utils/pageTypes';
import { render, act } from '../react-testing-library-with-providers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MostRead from '.';
import { PageTypes, Services, Variants } from '../../models/types/global';
import Canonical from './Canonical';
import Amp from './Amp';
import { MostReadData } from './types';

jest.mock('./Canonical');
jest.mock('./Amp');

interface MostReadProps {
  isAmp: boolean;
  service: Services;
  variant: Variants | null;
  mostReadToggle: boolean;
  pageType?: PageTypes;
  data?: MostReadData;
}

const MostReadWithContext = ({
  isAmp = false,
  service,
  variant = null,
  mostReadToggle,
  pageType = HOME_PAGE,
  data,
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
      isApp={false}
    >
      <ServiceContextProvider service={service} variant={variant}>
        <MostRead data={data} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

const shouldRenderMostRead = () => expect(Canonical).toHaveBeenCalled();

const shouldNotRenderMostRead = () => expect(Canonical).not.toHaveBeenCalled();

const shouldRenderMostReadAmp = () => expect(Amp).toHaveBeenCalled();

const shouldNotRenderMostReadAmp = () => expect(Amp).not.toHaveBeenCalled();

describe('MostRead', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
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
        dataResponse: pidginMostReadData,
      },
      {
        description: 'should render most read for serbian lat with toggles on',
        service: 'serbian',
        mostReadToggle: true,
        isAmp: false,
        variant: 'lat',
        renderExpectation: shouldRenderMostRead,
        dataResponse: serbianLatMostReadData,
      },
      {
        description: 'should not render most read for pidgin with toggles off',
        service: 'pidgin',
        mostReadToggle: false,
        isAmp: false,
        variant: null,
        renderExpectation: shouldNotRenderMostRead,
        dataResponse: pidginMostReadData,
      },
      {
        description: 'should not render most read when data is null',
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
      }) => {
        it(description, async () => {
          await act(async () => {
            render(
              <MostReadWithContext
                service={service as Services}
                mostReadToggle={mostReadToggle}
                isAmp={isAmp}
                variant={variant as Variants}
                // @ts-expect-error some responses are null
                data={dataResponse}
              />,
            );
          });

          renderExpectation();
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
      {
        description: 'should not render most read amp on home page',
        service: 'mundo',
        mostReadToggle: true,
        isAmp: true,
        variant: null,
        renderExpectation: shouldNotRenderMostReadAmp,

        pageType: HOME_PAGE,
      },
    ].forEach(
      ({
        description,
        service,
        mostReadToggle,
        isAmp,
        variant,
        renderExpectation,
        pageType,
      }) => {
        it(description, async () => {
          await act(async () => {
            render(
              <MostReadWithContext
                service={service as Services}
                mostReadToggle={mostReadToggle}
                isAmp={isAmp}
                variant={variant}
                pageType={pageType}
              />,
            );
          });

          renderExpectation();
        });
      },
    );
  });
});
