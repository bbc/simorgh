import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Timestamp from '.';

storiesOf('TimestampContainer', module)
  .add('default', () => (
    <Timestamp timestamp={1530947227000} isRelative={true} prefix='blas' />
  ))
  .add('with "Updated" prefix', () => (
    <Timestamp
      firstPublished={1530947227000}
      lastPublished={1552666749637}
      prefix='Updated'
    />
  ))
  .add('with prefix and suffix', () => (
    <Timestamp
      firstPublished={1530947227000}
      lastPublished={1552666749637}
      suffix='is date of last update'
      prefix='--->'
    />
  ));

