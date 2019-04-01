import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Timestamp from '.';

storiesOf('TimestampContainer', module).add('default', () => (
  <Timestamp lastPublished={1552666749637} firstPublished={1530947227000} />
));
