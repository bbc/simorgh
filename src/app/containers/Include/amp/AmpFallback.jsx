import React from 'react';
import EmbedError from '@bbc/psammead-embed-error';

const AmpFallback = () => (
  <EmbedError
    message="Sorry, we can’t display this part of the story on this lightweight mobile page."
    link={{
      text: 'View the full version of the page to see all the content.',
      href: 'https://www.bbc.co.uk/',
    }}
    fillViewport
  />
);

export default AmpFallback;
