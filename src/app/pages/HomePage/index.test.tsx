import React from 'react';
import { render } from '../../components/react-testing-library-with-providers';
import HomePage from './HomePage';

describe('Home Page', () => {
  it('should render a hello message', () => {
    const { container } = render(<HomePage />);
    expect(container).not.toBeEmptyDOMElement();
    expect(container.firstChild?.textContent).toBe(
      'Hi, I am a Home Page component!',
    );
  });
});
