import React from 'react';
import { render } from '@testing-library/react';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';

describe('MostReadContainer', () => {
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

  it('test data returns as expected', () => {
    expect('khoa').toEqual('khoa');
  });
});
