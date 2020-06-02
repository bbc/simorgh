import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import AmpIncludeContainer from './index.amp';

const validIdt2Props = {
  html: `<div>Hello</div>`,
  idt2: {
    altText: 'some alt text',
    dimensions: {
      small: {
        href:
          'https://www.example.com/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6/image/150',
        height: 400,
        width: 500,
      },
      medium: {
        href:
          'https://www.example.com/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6/image/350',
        height: 600,
        width: 700,
      },
      large: {
        href:
          'https://www.example.com/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6/image/550',
        height: 800,
        width: 900,
      },
    },
  },
  type: 'idt2',
};

const invalidIdt2Props = {
  html: `<div>Hello</div>`,
  type: 'idt2',
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

  it('should not render with invalid IDT2 props', async () => {
    act(() => {
      ReactDOM.render(<AmpIncludeContainer {...invalidIdt2Props} />, container);
    });
    expect(container.querySelectorAll('amp-img').length).toEqual(0);
    expect(container).toMatchSnapshot();
  });

  it('should not render for any include type other than an IDT2', async () => {
    const props = {
      ...validIdt2Props,
      type: 'vj',
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
