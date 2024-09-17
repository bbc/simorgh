import React from 'react';

import {
  render,
  screen,
} from '#components/react-testing-library-with-providers';
import Paragraph from '.';

describe('Paragraph', () => {
  it('should render the paragraph text in a p element', async () => {
    render(<Paragraph>Hello World!</Paragraph>);

    expect(screen.getByText('Hello World!').nodeName).toBe('P');
  });

  it('should render the correct typography for the mundo service', async () => {
    render(<Paragraph>Hello World!</Paragraph>, {
      service: 'mundo',
    });

    expect(screen.getByText('Hello World!')).toHaveStyle({
      color: '#141414',
      fontSize: '0.9375rem',
      lineHeight: '1.25rem',
      fontFamily: 'ReithSans,Helvetica,Arial,sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      margin: 0,
    });
  });

  it('should render the correct typography for the arabic service', async () => {
    render(<Paragraph>Hello World!</Paragraph>, {
      service: 'arabic',
    });

    expect(screen.getByText('Hello World!')).toHaveStyle({
      color: '#141414',
      fontSize: '0.9375rem',
      lineHeight: '1.5rem',
      fontFamily:
        '"BBC Reith Qalam","Times New Roman",Arial,Verdana,Geneva,Helvetica,sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      margin: 0,
    });
  });
});
