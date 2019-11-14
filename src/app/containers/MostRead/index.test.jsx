import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import newsMostReadData from '#data/news/mostRead';

describe('MostReadContainer', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    fetch.resetMocks();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const mostReadContainerWithContext = (service, variant = null) => (
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
      <ServiceContextProvider service={service}>
        <MostReadContainer />,
      </ServiceContextProvider>
    </RequestContextProvider>
  );

  it('test data returns as expected on canonical for News', async () => {
    await act(async () => {
      fetch.mockResponse(JSON.stringify(newsMostReadData));
      ReactDOM.render(mostReadContainerWithContext('news'), container);
    });

    expect(container.querySelector('p').textContent).toBe(
      `Generated: ${newsMostReadData.generated}`,
    );
    console.log(container.querySelector('p'));
  });
});
