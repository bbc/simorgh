import React from 'react';
import { render, act } from '../../../react-testing-library-with-providers';
import MPU from '.';
import { StaticRouter } from 'react-router';

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
          <MPU />
        </StaticRouter>,
        { service: 'pidgin', toggles },
      ));
    });

    expect(container).toMatchSnapshot();
  });
});
