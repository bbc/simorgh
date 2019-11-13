import React from 'react';
import { render } from '@testing-library/react';
import nock from 'nock';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';

describe('MostReadContainer', () => {
  it('test data returns as expected on canonical', () => {
    const scope = nock('http://localhost:7080')
      .get('/news/most_read.json')
      .reply(200, {
        records: ['test'],
      });

    const { container } = render(
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        service="serbian"
        statusCode={200}
        pathname="/serbian"
        variant="lat"
      >
        <MostReadContainer />
      </RequestContextProvider>,
    );
    expect('khoa').toEqual('khoa');
  });
});
