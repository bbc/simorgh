import React from 'react';
import {
  render,
  screen,
} from '../../../../src/app/components/react-testing-library-with-providers';
import ColorCard from '.';

describe('Storybook Color Card', () => {
  it('should render a Color Card when name and code are correctly provided', async () => {
    render(<ColorCard colorName="TEST_COLOR" colorCode="#123456" />);
    const name = screen.getByText('test_color');
    const code = screen.getByText('#123456');
    expect(name).toBeInTheDocument();
    expect(code).toBeInTheDocument();
  });

  it('should render the color name in lower case when an upper case color name is provided', async () => {
    render(<ColorCard colorName="TEST_COLOR" colorCode="#123456" />);
    const name = screen.getByText('test_color', {
      exact: true,
    });
    expect(name).toBeInTheDocument();
  });
});
