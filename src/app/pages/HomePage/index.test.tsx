import React from 'react';
import { render } from '../../components/react-testing-library-with-providers';
import HomePage from './HomePage';

describe('Home Page', () => {
  it('should render a hello message', () => {
    const { container } = render(
      <HomePage pageData={{ id: '1234', title: 'Abcd' }} />,
    );
    expect(container).not.toBeEmptyDOMElement();
    expect(container.firstChild?.textContent).toBe(
      'Hi, I am a Home Page component and your page id is 1234 and the title is Abcd!',
    );
  });
});
