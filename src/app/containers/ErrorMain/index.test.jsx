import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import ErrorMain from './index';

describe('ErrorMain', () => {
  shouldMatchSnapshot(
    'should correctly render for 404',
    <ErrorMain status={404} />,
  );

  shouldMatchSnapshot(
    'should correctly render for 500',
    <ErrorMain status={500} />,
  );

  shouldMatchSnapshot(
    'should correctly render for other status code',
    <ErrorMain status={451} />,
  );
});
