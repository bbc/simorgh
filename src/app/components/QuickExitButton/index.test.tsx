import React from 'react';
import { render } from '../react-testing-library-with-providers';
import QuickExitButton from './index';

describe('QuickExitButton', () => {
  it('renders the button', () => {
    const { getByTestId } = render(<QuickExitButton />);
    expect(getByTestId('quick-exit-button')).toBeInTheDocument();
  });
});
