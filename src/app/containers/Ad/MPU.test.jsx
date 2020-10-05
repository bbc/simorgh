import React from 'react';
import { render, act } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import MPU from './MPU';

const toggles = {
  ads: {
    enabled: true,
  },
};

describe('MPU', () => {
  it('should render correctly', async () => {
    const service = 'pidgin';

    let container;
    await act(async () => {
      ({ container } = render(
        <StaticRouter>
          <ToggleContextProvider toggles={toggles}>
            <RequestContextProvider
              isAmp={false}
              pageType="FIX"
              service={service}
              pathname="12345678"
              showAdsBasedOnLocation
            >
              <MPU />
            </RequestContextProvider>
          </ToggleContextProvider>
        </StaticRouter>,
      ));
    });

    expect(container).toMatchSnapshot();
  });
});
