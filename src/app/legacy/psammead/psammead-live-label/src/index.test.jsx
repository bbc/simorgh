import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import LiveLabel from './index';

describe('LiveLabel', () => {
  it('should render correctly with english live text', () => {
    const { container } = render(
      <LiveLabel service="news" ariaHidden offScreenText="Live" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with localised live text', () => {
    const { container } = render(
      <LiveLabel service="news" liveText="AS E DE HAPPEN" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with custom offscreen text', () => {
    const { container } = render(
      <LiveLabel service="news" ariaHidden offScreenText="Watch Live" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for RTL service', () => {
    const { container } = render(
      <LiveLabel service="arabic" dir="rtl" ariaHidden offScreenText="Live" />,
      { service: 'arabic' },
    );
    expect(container).toMatchSnapshot();
  });
});
