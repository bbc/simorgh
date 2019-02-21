import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Timestamp from '.';

describe('Timestamp', () => {
  shouldMatchSnapshot(
    'should render Timestamp with datetime attribute and text',
    <Timestamp datetime="1530947227000">7 July 2018</Timestamp>,
  );

  shouldMatchSnapshot(
    'should render Timestamp with a prefix',
    <Timestamp datetime="1530947227000" prefix="Updated ">
      7 July 2018
    </Timestamp>,
  );

  shouldMatchSnapshot(
    'should render Timestamp with a suffix',
    <Timestamp
      datetime="1530947227000"
      suffix={<span>Some custom markup</span>}
    >
      7 July 2018
    </Timestamp>,
  );
});
