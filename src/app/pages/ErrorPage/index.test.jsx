import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ERROR_PAGE from '.';

// eslint-disable-next-line react/prop-types
const ErrorPage = ({ errorCode, service }) => (
  <ERROR_PAGE
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
    <ErrorPage service="news" errorCode={404} />,
  );

  shouldMatchSnapshot(
    'should correctly render for 500',
    <ErrorPage service="news" errorCode={500} />,
  );

  shouldMatchSnapshot(
    'should correctly render for other status code',
    <ErrorPage service="news" errorCode={123} />,
  );

  shouldMatchSnapshot(
    'should correctly render for 404 for persian',
    <ErrorPage service="persian" errorCode={404} />,
  );

  shouldMatchSnapshot(
    'should correctly render for 500 for persian',
    <ErrorPage service="news" errorCode={500} />,
  );
});
