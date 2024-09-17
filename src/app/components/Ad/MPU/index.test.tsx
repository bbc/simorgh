import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '#components/react-testing-library-with-providers';
import MPU from '.';

const toggles = {
  ads: {
    enabled: true,
  },
};

describe('MPU', () => {
  it('should render without gel margins at all breakpoints and gel padding at smaller breakpoints', async () => {
    const { container } = render(
      <BrowserRouter>
        <MPU />
      </BrowserRouter>,
      { toggles, showAdsBasedOnLocation: true },
    );

    expect(container).toMatchSnapshot();
  });
});
