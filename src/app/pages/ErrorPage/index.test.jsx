import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ErrorPage from '.';

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  return props => <Component {...props} />;
});

// eslint-disable-next-line react/prop-types
const ErrorPageWithContext = ({ errorCode, service }) => (
  <ErrorPage
    errorCode={errorCode}
    service={service}
    bbcOrigin="https://www.bbc.co.uk"
    pathname={`/${service}`}
    pageType="error"
    isAmp={false}
  />
);

describe('ErrorPage', () => {
  shouldMatchSnapshot(
    'should correctly render for 404',
    <ErrorPageWithContext service="news" errorCode={404} />,
  );

  shouldMatchSnapshot(
    'should correctly render for 500',
    <ErrorPageWithContext service="news" errorCode={500} />,
  );

  shouldMatchSnapshot(
    'should correctly render for other status code',
    <ErrorPageWithContext service="news" errorCode={123} />,
  );

  shouldMatchSnapshot(
    'should correctly render for 404 for persian',
    <ErrorPageWithContext service="persian" errorCode={404} />,
  );

  shouldMatchSnapshot(
    'should correctly render for 500 for persian',
    <ErrorPageWithContext service="persian" errorCode={500} />,
  );
});
