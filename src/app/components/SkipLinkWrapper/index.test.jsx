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
        endTextId="end-of-content"
        text="Skip %foo_bar% content"
        endTextVisuallyHidden="End of %foo_bar%"
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

  it('should return child elements without skip link when a skip text prop is not passed in', () => {
    const terms = { '%foo_bar%': 'Foo Bar' };
    const { container } = render(
      <SkipLinkWrapper service="news" terms={terms} endTextId="end-of-content">
        <span>Foo Bar</span>
      </SkipLinkWrapper>,
    );

    const links = container.querySelectorAll('a');
    const spans = container.querySelectorAll('span');

    expect(links).toHaveLength(0);
    expect(spans[0].textContent).toEqual('Foo Bar');
  });
});
