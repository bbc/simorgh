import React from 'react';
import { render } from '@testing-library/react';
import { suppressPropWarnings } from '@bbc/psammead-test-helpers';
import Idt2Amp from './Idt2Amp';

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
    const { container } = render(<Idt2Amp {...validIdt2Props} />);

    expect(container.querySelectorAll('amp-img').length).toEqual(1);
    expect(container).toMatchSnapshot();
  });

  it('should return null when idt block has no imageBlock', async () => {
    const idt2Data = {
      href: '/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6',
      type: 'idt2',
    };
    suppressPropWarnings(['imageBlock', 'undefined']);
    const { container } = render(<Idt2Amp {...idt2Data} />);

    expect(container.querySelectorAll('amp-img').length).toEqual(0);
    expect(container).toMatchSnapshot();
  });
});
