import React from 'react';
import { render } from '@testing-library/react';

import Idt2Canonical from './index';

const HTML = {
  ALLOWED:
    '<script type="text/javascript" src="https://news.test.files.bbci.co.uk/include/idt2/static/js/dataPic.64a69df2.js"></script>',
  DISALLOWED:
    '<script type="text/javascript" src="https://news.test.files.bbci.co.uk/include/idt2/static/js/lineChart.64a69df2.js"></script>',
};

const imageBlock = {
  alt: 'An image.',
  src: 'https://www.bbc.com/ws/includes/idt2/image/816',
  srcset:
    'https://www.bbc.com/ws/includes/idt2/image/470 470w,https://www.bbc.com/ws/includes/idt2/image/816 816w',
};

describe('Include: IDT2 Canonical', () => {
  it('should render', () => {
    const { container } = render(
      <Idt2Canonical html={HTML.ALLOWED} imageBlock={imageBlock} index={0} />,
    );

    expect(/js\/dataPic\./.test(container.innerHTML)).toBe(true);
    expect(container).toMatchSnapshot();
  });

  it('should not render when `html` or `imageBlock` props are not present', () => {
    expect(
      render(<Idt2Canonical html={HTML.ALLOWED} index={0} />).container,
    ).toBeEmptyDOMElement();
    expect(
      render(<Idt2Canonical imageBlock={imageBlock} index={0} />).container,
    ).toBeEmptyDOMElement();
  });

  it('should render fallback when disallowed scripts are present', () => {
    const { container } = render(
      <Idt2Canonical
        html={HTML.DISALLOWED}
        imageBlock={imageBlock}
        index={0}
      />,
    );

    expect(/js\/lineChart\./.test(container.innerHTML)).toBe(false);
    expect(container).toMatchSnapshot();
  });
});
