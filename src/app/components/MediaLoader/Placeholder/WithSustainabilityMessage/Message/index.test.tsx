import React from 'react';
import { render } from '../../../../react-testing-library-with-providers';
import Message from '.';

describe('Message', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it(`should render a 'Help reduce your power consumption' message`, () => {
    const { container } = render(<Message />, {
      service: 'mundo',
    });
    const text = container.querySelector('p')?.innerHTML;

    expect(text).toEqual(
      'Ayude a reducir su uso de energía y datos al no reproducir contenido de video.',
    );
    expect(container).toMatchSnapshot();
  });
});
