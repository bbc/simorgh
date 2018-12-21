import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Timestamp from './index';

storiesOf('TimestampContainer', module).add('default', () => (
  <Timestamp timestamp={1530947227000} />
));
