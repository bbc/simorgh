import React from 'react';
// import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import newsMostReadData from '#data/news/mostRead';

describe('MostReadContainer', () => {
  it('test data returns as expected on canonical for News', () => {
    fetchMock.get(
      'http://localhost:7080/news/most_read.json',
      newsMostReadData,
      200,
    );

    act(() => {
      const { container } = render(
        <RequestContextProvider
          bbcOrigin="http://localhost:7080/news/articles/c0000000000o"
          id="c0000000000o"
          isAmp={false}
          pageType="article"
          service="news"
          statusCode={200}
          pathname="/news"
        >
          <ServiceContextProvider service="news">
            <MostReadContainer />,
          </ServiceContextProvider>
        </RequestContextProvider>,
        container,
      );
      console.log(container);
    });
  });
});
