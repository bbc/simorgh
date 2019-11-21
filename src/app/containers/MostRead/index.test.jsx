import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import newsMostReadData from '#data/news/mostRead';
import zhongwenSimpMostReadData from '#data/zhongwen/mostRead/simp';

let container;

const services = {
  news: { variant: null, data: newsMostReadData },
  zhongwen: { variant: 'simp', data: zhongwenSimpMostReadData },
};

const renderMostReadContainer = async ({ isAmp, service, variant = null }) =>
  act(async () => {
    ReactDOM.render(
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
      </RequestContextProvider>,
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

  Object.keys(services).map(service =>
    it(`test data returns as expected on canonical for ${service}`, async () => {
      const { variant, data: mostReadData } = services[service];
      const paragraphText = `Last Updated: ${mostReadData.lastRecordTimeStamp}`;

      fetch.mockResponse(JSON.stringify(mostReadData));
      await renderMostReadContainer({ isAmp: false, service, variant });

      expect(container.querySelector('p').textContent).toEqual(paragraphText);
      expect(container.querySelectorAll('ul').length).toEqual(10);
    }),
  );
});
