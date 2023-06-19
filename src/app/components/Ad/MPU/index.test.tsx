import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import MPU from '.';

const toggles = {
  ads: {
    enabled: true,
  },
};

describe('MPU', () => {
  it('should render without gel margins at all breakpoints and gel padding at smaller breakpoints', async () => {
    const { container } = render(<MPU />, { service: 'pidgin', toggles });

    expect(container).toMatchSnapshot();
  });
});
