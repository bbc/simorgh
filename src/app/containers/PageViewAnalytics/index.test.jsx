import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { RequestContextProvider } from '../../contexts/RequestContext';

jest.mock('./Canonical', () => () => <div>Canonical page view analytics</div>);

const PageViewAnalytics = require('./index').default;

describe('Page View Analytics Container', () => {
  shouldMatchSnapshot(
    'should render amp page view analytics correctly',
    <RequestContextProvider platform="amp">
      <PageViewAnalytics />
    </RequestContextProvider>,
  );

  shouldMatchSnapshot(
    'should render canonical page view analytics correctly',
    <RequestContextProvider platform="canonical">
      <PageViewAnalytics />
    </RequestContextProvider>,
  );
});
