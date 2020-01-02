import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import newsMostReadData from '#data/news/mostRead';
import zhongwenSimpMostReadData from '#data/zhongwen/mostRead/simp';
import { service as newsConfig } from '#app/lib/config/services/news';
import { service as zhongwenConfig } from '#app/lib/config/services/zhongwen';

let container;

const services = {
  news: { variant: null, data: newsMostReadData, config: newsConfig.default },
  zhongwen: {
    variant: 'simp',
    data: zhongwenSimpMostReadData,
    config: zhongwenConfig.simp,
  },
};

const getToggleState = enabled => ({
  local: { mostRead: { enabled } },
  test: { mostRead: { enabled } },
});

const renderMostReadContainer = async ({
  isAmp,
  service,
  variant = null,
  mostReadToggle = false,
}) =>
  act(async () => {
    ReactDOM.render(
      <ToggleContext.Provider
        value={{ toggleState: getToggleState(mostReadToggle) }}
      >
        <RequestContextProvider
          bbcOrigin={`http://localhost:7080/${service}/articles/c0000000000o`}
          id="c0000000000o"
          isAmp={isAmp}
          pageType="article"
          service={service}
          statusCode={200}
          pathname={`/${service}`}
          variant={variant}
        >
          <ServiceContextProvider service={service} variant={variant}>
            <MostReadContainer />
          </ServiceContextProvider>
        </RequestContextProvider>
      </ToggleContext.Provider>,
      container,
    );
  });

describe('MostReadContainerCanonical', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container = null;
    fetch.resetMocks();
  });

  Object.keys(services).forEach(service => {
    it(`test data returns as expected on canonical for ${service}`, async () => {
      const { variant, data: mostReadData, config } = services[service];
      const mostReadHeader = config.mostRead.header;

      fetch.mockResponse(JSON.stringify(mostReadData));
      await renderMostReadContainer({
        isAmp: false,
        service,
        variant,
        mostReadToggle: true,
      });
      expect(container.querySelector('h2').textContent).toEqual(mostReadHeader);
      expect(container.querySelectorAll('li').length).toEqual(10);
    });

    it(`should return empty string when mostRead toggle is disabled - ${service}`, async () => {
      const { variant, data: mostReadData } = services[service];

      fetch.mockResponse(JSON.stringify(mostReadData));
      await renderMostReadContainer({ isAmp: false, service, variant });
      expect(container.innerHTML).toEqual('');
    });
  });
});
