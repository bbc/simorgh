import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import notes from '../README.md';
import Byline from './index';

storiesOf('Components/Byline', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ service, script }) => (
      <Byline
        service={service}
        script={script}
        avatar={{ src: 'https://i.pravatar.cc/128?img=69' }}
        name={text('name', 'John Smith')}
        title={text('title', 'Art editor')}
      />
    ),
    { notes },
  )
  .add(
    'without avatar',
    ({ service, script }) => (
      <Byline
        service={service}
        script={script}
        name={text('name', 'By John Smith')}
        title={text('title', 'Art editor')}
      />
    ),
    { notes },
  );
