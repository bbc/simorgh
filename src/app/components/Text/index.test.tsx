import React from 'react';

import Text from '.';
import { render, screen } from '../react-testing-library-with-providers';

describe('Text', () => {
  it('should render the text in a span element by default', () => {
    render(<Text>Hello World!</Text>);

    expect(screen.getByText('Hello World!').nodeName).toBe('SPAN');
  });

  it('should render the text in a paragraph element using the as prop', () => {
    render(<Text as="p">Hello World!</Text>);

    expect(screen.getByText('Hello World!').nodeName).toBe('P');
  });

  it('should render the correct typography for the mundo service', () => {
    render(<Text>Hello World!</Text>, {
      service: 'mundo',
    });

    expect(screen.getByText('Hello World!')).toHaveStyle({
      color: '#141414',
      fontSize: '0.9375rem',
      lineHeight: '1.25rem',
      fontFamily: 'ReithSans,Helvetica,Arial,sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
    });
  });

  it('should render the correct typography for the mundo service', () => {
    render(<Text fontVariant="serifRegular">Hello World!</Text>, {
      service: 'mundo',
    });

    expect(screen.getByText('Hello World!')).toHaveStyle({
      color: '#141414',
      fontSize: '0.9375rem',
      lineHeight: '1.25rem',
      fontFamily: 'ReithSerif,Helvetica,Arial,sans-serif',
      fontStyle: 'normal',
      fontWeight: 500,
    });
  });

  it('should render the correct typography for the arabic service', () => {
    render(<Text>Hello World!</Text>, {
      service: 'arabic',
    });

    expect(screen.getByText('Hello World!')).toHaveStyle({
      color: '#141414',
      fontSize: '0.9375rem',
      lineHeight: '1.5rem',
      fontFamily: '"BBC Reith Qalam",Arial,Verdana,Geneva,Helvetica,sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
    });
  });

  it('should render the correct typography for the atlas GEL size', () => {
    render(<Text size="atlas">Hello World!</Text>);

    expect(screen.getByText('Hello World!')).toHaveStyle({
      color: '#141414',
      fontSize: '4.875rem',
      lineHeight: '5.25rem',
      fontFamily: 'ReithSans,Helvetica,Arial,sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
    });
  });

  it('should render the correct typography for the mundo service', () => {
    render(<Text>Hello World!</Text>, {
      service: 'mundo',
    });

    expect(screen.getByText('Hello World!')).toHaveStyle({
      color: '#141414',
      fontSize: '0.9375rem',
      lineHeight: '1.25rem',
      fontFamily: 'ReithSans,Helvetica,Arial,sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
    });
  });

  it('should render the correct typography for the mundo service', () => {
    render(<Text fontVariant="serifRegular">Hello World!</Text>, {
      service: 'mundo',
    });

    expect(screen.getByText('Hello World!')).toHaveStyle({
      color: '#141414',
      fontSize: '0.9375rem',
      lineHeight: '1.25rem',
      fontFamily: 'ReithSerif,Helvetica,Arial,sans-serif',
      fontStyle: 'normal',
      fontWeight: 500,
    });
  });

  it('should render the correct typography for the arabic service', () => {
    render(<Text>Hello World!</Text>, {
      service: 'arabic',
    });

    expect(screen.getByText('Hello World!')).toHaveStyle({
      color: '#141414',
      fontSize: '0.9375rem',
      lineHeight: '1.5rem',
      fontFamily: '"BBC Reith Qalam",Arial,Verdana,Geneva,Helvetica,sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
    });
  });

  it('should render HTML attributes', () => {
    render(<Text tabIndex={-1}>Hello World!</Text>);

    expect(screen.getByText('Hello World!')).toHaveAttribute('tabindex', '-1');
  });
});
