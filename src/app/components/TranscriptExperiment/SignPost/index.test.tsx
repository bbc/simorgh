import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import SignPost from '.';

describe('Sign Post', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it(`should render a 'Help reduce your power consumption' message`, () => {
    const { container } = render(<SignPost />, {
      service: 'news',
    });
    const text = container.querySelector('p')?.innerHTML;

    expect(text).toEqual(
      'Help reduce your power and data usage by not playing video content.',
    );
    expect(container).toMatchSnapshot();
  });
});
