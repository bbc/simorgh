import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';

import OEmbed from './index';
import oEmbeds from './fixtures';

const OEMBED_ATTACK = {
  html: '<math><mi//xlink:href="data:x,<script>alert(4)</script>">',
};

describe('OEmbed', () => {
  Object.keys(oEmbeds).forEach(provider => {
    const oEmbed = oEmbeds[provider];

    shouldMatchSnapshot(
      `should render oEmbed HTML from ${oEmbed.provider_name}`,
      <OEmbed oEmbed={oEmbed} />,
    );
  });

  shouldMatchSnapshot(
    `should be styleable`,
    <OEmbed
      className="parent-component-applied-class"
      oEmbed={{ html: '<p>Hello, World.</p>' }}
    />,
  );

  it('should clean an XSS attack from oEmbed HTML', () => {
    const { container } = render(<OEmbed oEmbed={OEMBED_ATTACK} />);
    expect(container.firstChild.innerHTML).toEqual('<math><mi></mi></math>');
  });
});
