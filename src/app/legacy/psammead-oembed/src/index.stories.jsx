import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';

import OEmbed from './index';
import oEmbeds from './fixtures';

const fixtures = {};
Object.values(oEmbeds).forEach(oEmbed => {
  fixtures[oEmbed.provider_name] = oEmbed;
});

storiesOf('Components/OEmbed', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(withServicesKnob())
  .add(
    'default',
    () => <OEmbed oEmbed={select('Fixture', fixtures, fixtures.Twitter)} />,
    { notes },
  );
