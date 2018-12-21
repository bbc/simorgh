import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Timestamp from './index';

describe('Timestamp', () => {
  shouldMatchSnapshot(
    'should render Timestamp with datetime attribute and text',
    <Timestamp datetime="1530947227000" datetimeText="7 July 2018" />,
  );
});
