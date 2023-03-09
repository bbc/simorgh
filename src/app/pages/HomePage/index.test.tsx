import React from 'react';
import { render } from '../../components/react-testing-library-with-providers';
import HomePage from './HomePage';

describe('Home Page', () => {
  it('should render a hello message with id from page data', () => {
    const { container } = render(<HomePage pageData={{ id: '12345' }} />);
    expect(container).not.toBeEmptyDOMElement();
    expect(container.firstChild?.textContent).toBe(
      'Hi, I am a Home Page component! My id is 12345',
    );
  });
});
