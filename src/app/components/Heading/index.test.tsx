import React from 'react';

import Heading from '.';
import { render, screen } from '#components/react-testing-library-with-providers';

describe('Heading', () => {
  it('should render the heading text in an h1 element', async () => {
    render(<Heading level={1}>Hello World!</Heading>);

    expect(screen.getByText('Hello World!').nodeName).toBe('H1');
  });

  it('should render the heading text in an h2 element', async () => {
    render(<Heading level={2}>Hello World!</Heading>);

    expect(screen.getByText('Hello World!').nodeName).toBe('H2');
  });

  it('should render the correct typography for the mundo service', async () => {
    render(<Heading level={1}>Hello World!</Heading>, {
      service: 'mundo',
    });

    expect(screen.getByText('Hello World!')).toHaveStyle({
      color: '#141414',
      fontSize: '1.75rem',
      lineHeight: '2.25rem',
      fontFamily: 'ReithSans,Helvetica,Arial,sans-serif',
      fontStyle: 'normal',
      fontWeight: 700,
      margin: 0,
    });
  });
});
