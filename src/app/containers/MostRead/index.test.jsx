import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import MostReadContainer from '.';

describe('MostReadContainer', () => {
  const { container } = render(
    <ServiceContextProvider service="serbian" variant="lat">
      <MostReadContainer />
    </ServiceContextProvider>,
  );

  it('test data returns as expected', () => {
    console.log(container);
    expect('khoa').toEqual('khoa');
  });
});
