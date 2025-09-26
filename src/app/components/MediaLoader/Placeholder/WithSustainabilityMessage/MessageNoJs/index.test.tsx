import React from 'react';
import { render } from '../../../../react-testing-library-with-providers';
import MessageNoJs from '.';

describe('Message No JS', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it(`should render a 'Help reduce your power consumption' message`, () => {
    const { container } = render(
      <MessageNoJs noJsMessage="Help reduce your power and data usage by not playing video content." />,
      {
        service: 'mundo',
      },
    );
    expect(container.querySelector('noscript')).toBeInTheDocument();
  });
});
