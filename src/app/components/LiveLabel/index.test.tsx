import React from 'react';
import { render } from '../react-testing-library-with-providers';
import LiveLabel from '.';

describe('LiveLabel', () => {
  it('should render correctly with localised live text', () => {
    const { container } = render(<LiveLabel />, {
      service: 'pidgin',
    });
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with English live text', () => {
    const { container } = render(<LiveLabel />, {
      service: 'russian',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with English live text and children', () => {
    const { container } = render(<LiveLabel> this is a headline </LiveLabel>, {
      service: 'news',
    });
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with custom offscreen text', () => {
    const { container } = render(<LiveLabel offScreenText="Watch Live" />);
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for RTL service', () => {
    const { container } = render(<LiveLabel />, {
      service: 'arabic',
    });
    expect(container).toMatchSnapshot();
  });
});
