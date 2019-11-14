import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import newsMostReadData from '#data/news/mostRead';
import zhongwenSimpMostReadData from '#data/zhongwen/mostRead/simp';

let container;

const renderMostReadContainer = async ({ service, variant = null }) =>
  act(async () => {
    ReactDOM.render(
      <RequestContextProvider
        bbcOrigin={`http://localhost:7080/${service}/articles/c0000000000o`}
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        service={service}
        statusCode={200}
        pathname={`/${service}`}
        variant={variant}
      >
        <ServiceContextProvider service={service} variant={variant}>
          <MostReadContainer />,
        </ServiceContextProvider>
      </RequestContextProvider>,
      container,
    );
  });

describe('MostReadContainer', () => {
  beforeAll(() => {
    container = null;
    container = document.createElement('div');
    document.body.appendChild(container);
    fetch.resetMocks();
  });

  it('test data returns as expected on canonical for News', async () => {
    fetch.mockResponse(JSON.stringify(newsMostReadData));
    await renderMostReadContainer({ service: 'news' });
    expect(container.querySelector('p').textConent).toEqual(
      `Last Updated: ${newsMostReadData.lastRecordTimeStamp}`,
    );
    expect(container.querySelectorAll('ul').length).toEqual(10);
  });

  it('test data returns as expected on canonical for Zhongwen Simp', async () => {
    fetch.mockResponse(JSON.stringify(zhongwenSimpMostReadData));
    await renderMostReadContainer({ service: 'zhongwen', variant: 'simp' });
    expect(container.querySelector('p').textContent).toEqual(
      `Last Updated:: ${zhongwenSimpMostReadData.lastRecordTimeStamp}`,
    );
    expect(container.querySelectorAll('ul').length).toEqual(10);
  });
});
