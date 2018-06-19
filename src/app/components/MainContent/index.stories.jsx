import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import MainContent from './index';
import { model } from '../../../../data/test/scenario-27.json';

storiesOf('MainContent', module).add('default', () => (
  <MainContent model={model} />
));
