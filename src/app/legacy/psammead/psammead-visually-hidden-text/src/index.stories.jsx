import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import notes from '../README.md';
import VisuallyHiddenText from './index';

storiesOf('Components/VisuallyHiddenText', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text, service }) => (
      <VisuallyHiddenText>
        {service === 'news' ? 'Visually hidden text' : text}
      </VisuallyHiddenText>
    ),
    { notes, knobs: { escapeHTML: false } },
  );
