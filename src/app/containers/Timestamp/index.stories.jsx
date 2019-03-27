import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Timestamp from '.';

storiesOf('TimestampContainer', module).add('default', () => (
  <Timestamp updated={1552666749637} published={1530947227000} />
));
