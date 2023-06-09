import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { render } from '../../react-testing-library-with-providers';
import MPU from './index';

const toggles = {
  ads: {
    enabled: true,
  },
};

describe('MPU', () => {
  it('should render without gel margins at all breakpoints and gel padding at smaller breakpoints', async () => {
    const { container } = render(
      <StaticRouter>
        <MPU />
      </StaticRouter>,
      { service: 'pidgin', toggles },
    );

    expect(container).toMatchSnapshot();
  });
});
