import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
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
