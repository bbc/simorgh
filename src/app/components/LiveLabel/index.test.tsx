import React from 'react';
import { render } from '../react-testing-library-with-providers';
import LiveLabel from '.';

describe('LiveLabel', () => {
  it('should render correctly with english live text', () => {
    const { container } = render(<LiveLabel ariaHidden offScreenText="Live" />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with localised live text', () => {
    const { container } = render(<LiveLabel liveText="AS E DE HAPPEN" />, {
      service: 'pidgin',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with custom offscreen text', () => {
    const { container } = render(
      <LiveLabel ariaHidden offScreenText="Watch Live" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for RTL service', () => {
    const { container } = render(
      <LiveLabel ariaHidden offScreenText="Live" />,
      { service: 'arabic' },
    );
    expect(container).toMatchSnapshot();
  });
});
