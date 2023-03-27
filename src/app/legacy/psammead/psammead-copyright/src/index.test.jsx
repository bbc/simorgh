import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import Copyright from './index';

describe('Copyright', () => {
  it('should render correctly', () => {
    const { container } = render(<Copyright>Getty Images</Copyright>);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when passed prop position with value "right"', () => {
    const { container } = render(
      <Copyright position="right">Getty Images</Copyright>,
    );
    expect(container).toMatchSnapshot();
  });
});
