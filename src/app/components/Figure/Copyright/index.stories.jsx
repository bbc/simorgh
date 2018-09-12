import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Copyright from './index';

storiesOf('Copyright', module).add('default', () => (
  <Copyright>Getty Images</Copyright>
));
