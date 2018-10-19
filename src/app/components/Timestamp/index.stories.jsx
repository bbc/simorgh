import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Timestamp from './index';

storiesOf('Timestamp', module).add('default', () => (
  <Timestamp>
    <time timedate={1539969006}>19 October 2018</time>
  </Timestamp>
));
