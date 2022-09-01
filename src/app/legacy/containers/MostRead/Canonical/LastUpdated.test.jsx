import React from 'react';
import { latin } from '#psammead/gel-foundations/src/scripts';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import LastUpdated from './LastUpdated';

describe('MostReadCanonical - LastUpdated', () => {
  shouldMatchSnapshot(
    'should render LastUpdated correctly',
    <LastUpdated
      timestamp={864691200}
      prefix="Last Updated:"
      script={latin}
      service="news"
      locale="en-gb"
      timezone="Europe/London"
    />,
  );
});
