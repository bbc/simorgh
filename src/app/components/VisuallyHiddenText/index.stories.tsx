import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { Services } from '../../models/types/global';
import notes from '../README.md';
import VisuallyHiddenText from './index';

interface Props {
  service: Services;
  text: string;
}

storiesOf('Components/VisuallyHiddenText', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text, service }: Props) => (
      <VisuallyHiddenText>
        {service === 'news' ? 'Visually hidden text' : text}
      </VisuallyHiddenText>
    ),
    { notes, knobs: { escapeHTML: false } },
  );
