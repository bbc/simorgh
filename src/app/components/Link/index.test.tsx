import React from 'react';

import Link from '.';
import { render, screen } from '../react-testing-library-with-providers';

describe('Link', () => {
  it('should render the link in an anchor element with correct href attribute', () => {
    render(<Link to="/mundo/articles/ce42wzqr2mko">Hello World!</Link>);

    const anchorEl = screen.getByText('Hello World!');

    expect(anchorEl.nodeName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', '/mundo/articles/ce42wzqr2mko');
  });
});
