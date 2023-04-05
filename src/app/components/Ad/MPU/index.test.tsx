import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { render } from '../../react-testing-library-with-providers';
import MPU from '.';

const toggles = {
  ads: {
    enabled: true,
  },
};

describe('MPU', () => {
  it('should render without gel margins at all breakpoints and gel padding at smaller breakpoints', async () => {
    const { container } = render(
      <StaticRouter>
        <ToggleContextProvider toggles={toggles}>
          <MPU />
        </ToggleContextProvider>
      </StaticRouter>,
      { showAdsBasedOnLocation: true },
    );

    expect(container).toMatchSnapshot();
  });
});
