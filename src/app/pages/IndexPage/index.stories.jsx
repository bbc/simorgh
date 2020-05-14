import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import IndexPage from '.';

storiesOf('Pages|Index Page', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', () => <IndexPage />);
