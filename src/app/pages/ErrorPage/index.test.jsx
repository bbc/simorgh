import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import ErrorPage from '.';

describe('ErrorPage', () => {
  shouldMatchSnapshot(
    'should correctly render for 404',
    <ServiceContextProvider service="news">
      <ErrorPage errorCode={404} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for 500',
    <ServiceContextProvider service="news">
      <ErrorPage errorCode={500} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for other status code',
    <ServiceContextProvider service="news">
      <ErrorPage errorCode={123} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for 404 for persian',
    <ServiceContextProvider service="persian">
      <ErrorPage errorCode={404} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for 500 for persian',
    <ServiceContextProvider service="persian">
      <ErrorPage errorCode={500} />
    </ServiceContextProvider>,
  );
});
