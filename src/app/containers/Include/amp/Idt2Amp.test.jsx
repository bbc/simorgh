import React from 'react';
import { render } from '@testing-library/react';
import AmpIncludeContainer from './Idt2Amp';

const validIdt2Props = {
  imageBlock: {
    alt: 'image alt text',
    height: 1864,
    layout: 'responsive',
    src: 'https://foobar.com/includes/image/816',
    srcset:
      'https://foobar.com/includes/image/470 470w,https://foobar.com/includes/image/816 816w',
    width: 1632,
  },
};

describe('AmpIncludeContainer', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should render for a valid IDT2 include', async () => {
    const { container } = render(<AmpIncludeContainer {...validIdt2Props} />);

    expect(container.querySelectorAll('amp-img').length).toEqual(1);
    expect(container).toMatchSnapshot();
  });
});
