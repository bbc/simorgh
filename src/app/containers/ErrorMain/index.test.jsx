import React from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ErrorMain from './index';

describe('ErrorMain', () => {
  shouldMatchSnapshot(
    'should correctly render for 404',
    <ServiceContextProvider service="news">
      <ErrorMain status={404} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for 500',
    <ServiceContextProvider service="news">
      <ErrorMain status={500} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for other status code',
    <ServiceContextProvider service="news">
      <ErrorMain status={123} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for 404 for persian',
    <ServiceContextProvider service="persian">
      <ErrorMain status={404} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for 500 for persian',
    <ServiceContextProvider service="persian">
      <ErrorMain status={500} />
    </ServiceContextProvider>,
  );
});
