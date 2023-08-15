import React from 'react';
import { render } from '../../react-testing-library-with-providers';

import OEmbedLoader from '.';

const riddleBlock = {
  id: '2e52f92d',
  type: 'oEmbed',
  oembed: {
    version: '1.0',
    provider_name: 'riddle',
    provider_url: 'https://www.riddle.com',
    url: 'https://www.riddle.com/view/SAVstNdh',
    html: '<div class="riddle2-wrapper" data-rid-id="SAVstNdh" data-auto-scroll="true" data-is-fixed-height-enabled="false" data-bg="#fff" data-fg="#00205b" style="margin:0 auto; max-width:100%; width:640px;" ><script src="https://www.riddle.com/embed/build-embedjs/embedV2.js"></script><iframe src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false" allow="autoplay" referrerpolicy="strict-origin"><section data-block="SingleChoice"><h2>How silly is Abby?</h2><p>&lt;p&gt;Babby&lt;/p&gt;</p><ul><li>Extremely silly</li><li>Not silly at all</li><li>Not very silly</li><li>Very silly</li></ul></section><section data-block="SingleChoice"><h3>What is Abby&#039;s silliness level?</h3><ul><li>High</li><li>Low</li><li>Medium</li><li>None</li></ul></section><section data-block="SingleChoice"><h3>How often is Abby silly?</h3><ul><li>Never</li><li>Rarely</li><li>Always</li><li>Sometimes</li></ul></section><section data-block="SingleChoice"><h3>What is Abby&#039;s silliness like?</h3><ul><li>Outrageous</li><li>Non-existent</li><li>Mild</li><li>Moderate</li></ul></section><section data-block="SingleChoice"><h3>How would you describe Abby&#039;s silliness?</h3><ul><li>Crazy</li><li>Calm</li><li>Boring</li><li>Sensible</li></ul></section></iframe></div>',
    type: 'rich',
  },
  link: '',
  aresType: 'aresRiddle',
};

describe('Canonical - OEmbed', () => {
  it('Riddle Embed - Should show an iframe with the appropriate link', () => {
    const { container } = render(
      <OEmbedLoader {...riddleBlock} isAmp={false} />,
    );
    const actual = container.querySelector(
      'iframe[src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false"]',
    );
    expect(actual).toBeInTheDocument();
  });
});

describe('AMP - OEmbed', () => {
  it('Riddle Embed - Should show an error message with a link to the riddle', () => {
    const { container, getByText } = render(
      <OEmbedLoader {...riddleBlock} isAmp />,
    );
    const iFrameElement = container.querySelector(
      'iframe[src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false"]',
    );
    const linkToRiddle = container.querySelector(
      'a[href="https://www.riddle.com/view/SAVstNdh"]',
    );
    const errorMessage = getByText(
      'Sorry, we can’t display this part of the story on this lightweight mobile page.',
    );

    expect(iFrameElement).toBe(null);
    expect(linkToRiddle).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
