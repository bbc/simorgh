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
    () => {
      const props: Props = {
        text: 'Some text',
        service: 'news',
      };

      return (
        <VisuallyHiddenText {...props}>
          {props.service === 'news' ? 'Visually hidden text' : props.text}
        </VisuallyHiddenText>
      );
    },
    { notes, knobs: { escapeHTML: false } },
  );
