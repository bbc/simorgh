import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import EmbedError from './index';

describe('EmbedError', () => {
  shouldMatchSnapshot(
    'renders a default embed error',
    <EmbedError message="Sorry, we can't display this part of the story on this lightweight mobile page." />,
  );

  shouldMatchSnapshot(
    'renders an embed error with a link',
    <EmbedError
      message="Sorry, we can't display this part of the story on this lightweight mobile page."
      link={{
        text: 'View the full version of the page to see all the content.',
        href: '#',
      }}
    />,
  );

  shouldMatchSnapshot(
    'renders an embed error that fills the viewport',
    <EmbedError
      message="Sorry, we can't display this part of the story on this lightweight mobile page."
      fillViewport
    />,
  );
});
