import React from 'react';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import TimestampContainer from './index';

const timestamp = 1539969006;

describe('TimestampContainer', () => {
  describe('with no data', () => {
    isNull('should return null', <TimestampContainer />);
  });

  shouldMatchSnapshot(
    'should render correctly',
    <TimestampContainer timestamp={timestamp} />,
  );
});
