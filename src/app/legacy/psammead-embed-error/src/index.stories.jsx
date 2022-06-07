import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';
import EmbedError from './index';

storiesOf('Components/EmbedError', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ service }) => (
      <EmbedError
        service={service}
        message={text(
          'message',
          "Sorry, we can't display this part of the story on this lightweight mobile page.",
        )}
        link={{
          text: text('link text', ''),
          href: '#',
        }}
        fillViewport={boolean('fillViewport', false)}
      />
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'with link',
    ({ service }) => (
      <EmbedError
        service={service}
        message={text(
          'message',
          "Sorry, we can't display this part of the story on this lightweight mobile page.",
        )}
        link={{
          text: text(
            'text',
            'View the full version of the page to see all the content.',
          ),
          href: '#',
        }}
        fillViewport={boolean('fillViewport', false)}
      />
    ),
    { notes, knobs: { escapeHTML: false } },
  );
