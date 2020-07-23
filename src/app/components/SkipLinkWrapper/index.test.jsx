import React from 'react';
import { render } from '@testing-library/react';

import SkipLinkWrapper from '.';

describe('SkipLinkWrapper', () => {
  it('should wrap child elements with a visually hidden skip link text', () => {
    const terms = { '%foo_bar%': 'Foo Bar' };
    const { container } = render(
      <SkipLinkWrapper
        service="news"
        terms={terms}
        skipEndId="end-of-content"
        skipText="Skip %foo_bar% content"
        skipEndText="End of %foo_bar%"
      >
        <span>Foo Bar</span>
      </SkipLinkWrapper>,
    );

    const links = container.querySelectorAll('a');
    const skipLink = links[0];

    expect(links).toHaveLength(1);
    expect(skipLink.getAttribute('href')).toEqual('#end-of-content');
    expect(skipLink.textContent).toEqual('Skip Foo Bar content');
  });
});
