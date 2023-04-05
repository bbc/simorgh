import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { render, act } from '../../react-testing-library-with-providers';
import MPU from '.';

const toggles = {
  ads: {
    enabled: true,
  },
};

describe('MPU', () => {
  it('should render without gel margins at all breakpoints and gel padding at smaller breakpoints', async () => {
    let container;
    await act(async () => {
      ({ container } = render(
        <StaticRouter>
          <ToggleContextProvider toggles={toggles}>
            <MPU />
          </ToggleContextProvider>
        </StaticRouter>,
      ));
    });

    expect(container).toMatchSnapshot();
  });
});
