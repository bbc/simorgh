import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';
import BulletedList, { BulletedListItem } from './index';

storiesOf('Components/BulletedList', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text, script, service, dir }) => (
      <BulletedList dir={dir} script={script} service={service}>
        <BulletedListItem>{text}</BulletedListItem>
        <BulletedListItem>
          {text} {text}
        </BulletedListItem>
        <BulletedListItem>{text.substring(0, 10)}</BulletedListItem>
        <BulletedListItem>
          {text} {text} {text} {text}
        </BulletedListItem>
      </BulletedList>
    ),
    { notes },
  )
  .add(
    'red square bullets',
    ({ text, script, service, dir }) => (
      <BulletedList
        dir={dir}
        script={script}
        service={service}
        bulletPointShape="square"
        bulletPointColour="red"
      >
        <BulletedListItem>{text}</BulletedListItem>
        <BulletedListItem>
          {text} {text}
        </BulletedListItem>
        <BulletedListItem>{text.substring(0, 10)}</BulletedListItem>
        <BulletedListItem>
          {text} {text} {text} {text}
        </BulletedListItem>
      </BulletedList>
    ),
    { notes },
  );
