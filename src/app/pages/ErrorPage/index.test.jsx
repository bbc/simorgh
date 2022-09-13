import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../../components/ThemeProvider';
import ErrorPage from './ErrorPage';

jest.mock('../../components/ThemeProvider');

describe('ErrorPage', () => {
  shouldMatchSnapshot(
    'should correctly render for 404',
    <ServiceContextProvider service="news">
      <ThemeProvider service="news" variant="default">
        <ErrorPage errorCode={404} />
      </ThemeProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for 500',
    <ServiceContextProvider service="news">
      <ThemeProvider service="news" variant="default">
        <ErrorPage errorCode={500} />
      </ThemeProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for other status code',
    <ServiceContextProvider service="news">
      <ThemeProvider service="news" variant="default">
        <ErrorPage errorCode={123} />
      </ThemeProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for 404 for persian',
    <ServiceContextProvider service="persian">
      <ThemeProvider service="persian" variant="default">
        <ErrorPage errorCode={404} />
      </ThemeProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render for 500 for persian',
    <ServiceContextProvider service="persian">
      <ThemeProvider service="persian" variant="default">
        <ErrorPage errorCode={500} />
      </ThemeProvider>
    </ServiceContextProvider>,
  );
});
