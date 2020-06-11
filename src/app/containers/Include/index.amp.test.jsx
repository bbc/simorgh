import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import AmpIncludeContainer from './index.amp';

const validIdt2Props = {
  html: `<div>Hello</div>`,
  type: 'idt2',
  imageBlock: {
    altText: 'image alt text',
    height: 1864,
    layout: 'responsive',
    src: 'https://foobar.com/includes/image/816',
    srcset:
      'https://foobar.com/includes/image/470 470w,https://foobar.com/includes/image/816 816w',
    width: 1632,
  },
};

describe('AmpIncludeContainer', () => {
  let container;
  const includesBaseUrl = 'https://foobar.com/includes';
  process.env.SIMORGH_INCLUDES_BASE_URL = includesBaseUrl;

  beforeEach(() => {
    jest.resetModules();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('should not render for an unsuported include type', async () => {
    const props = {
      ...validIdt2Props,
      type: 'vj2',
    };
    act(() => {
      ReactDOM.render(<AmpIncludeContainer {...props} />, container);
    });
    expect(container.querySelectorAll('amp-img').length).toEqual(0);
    expect(container).toMatchSnapshot();
  });

  it('should render for a valid IDT2 include', async () => {
    act(() => {
      ReactDOM.render(<AmpIncludeContainer {...validIdt2Props} />, container);
    });
    expect(container.querySelectorAll('amp-img').length).toEqual(1);
    expect(container).toMatchSnapshot();
  });
});
