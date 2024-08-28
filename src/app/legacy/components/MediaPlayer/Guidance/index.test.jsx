import React from 'react';
import Guidance from '.';
import { render } from '#components/react-testing-library-with-providers';

describe('Media Player: Guidance', () => {
  it('should render Guidance', () => {
    const { container } = render(
      <Guidance
        guidanceMessage="Guidance: Contains strong language with adult humor"
        service="news"
        noJsMessage="no js"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render no-js styles when noJsClassName prop is used', () => {
    const { container } = render(
      <Guidance
        guidanceMessage="Guidance: Contains strong language with adult humor"
        service="news"
        noJsMessage="This media cannot play in your browser. Please enable Javascript or a different browser."
        noJsClassName="no-js"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
