import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { render } from '@testing-library/react';
import Amp from '.';

describe('Media Player: Amp', () => {
  shouldMatchSnapshot(
    'should render an amp-iframe with an amp-img nested inside',
    <Amp
      placeholderSrc="https://foo.bar/placeholder.png"
      placeholderSrcset="https://bbc.com/300/cat.jpg 300w, https://bbc.com/450/cat.jpg 450w, https://bbc.com/600/cat.jpg 600w"
      src="https://foo.bar/iframe"
      title="Media player"
      height={9}
      width={16}
    />,
  );

  it('should contain the noscript tag for use in non-JS scenarios ', () => {
    render(
      <Amp
        placeholderSrcset="https://bbc.com/300/cat.jpg 300w, https://bbc.com/450/cat.jpg 450w, https://bbc.com/600/cat.jpg 600w"
        placeholderSrc="https://foo.bar/placeholder.png"
        src="https://foo.bar/iframe"
        title="Media player"
        height={9}
        width={16}
        noJsMessage="Please enable Javascript or try a different browser"
        service="news"
      />,
    );
    expect(document.querySelector('noscript')).toBeInTheDocument();
  });
});
