import React from 'react';
import EmbedError from '.';

export default {
  title: 'Components/Embeds/Embed Error',
  component: EmbedError,
};

export const EmbedErrorMessage = () => (
  <EmbedError
    message="Sorry, we can’t display this part of the story on this lightweight mobile page."
    link={{
      text: 'View the full version of the page to see all the content.',
      href: 'https://www.riddle.com/view/SAVstNdh',
    }}
  />
);
