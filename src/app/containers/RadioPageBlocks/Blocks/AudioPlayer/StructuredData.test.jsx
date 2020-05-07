import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import StructuredData from './StructuredData';

const props = {
  promoBrandTitle: 'ماښامنۍ خپرونه',
  shortSynopsis: 'د بي بي سي ورلډ سروس څخه پروګرام کول',
  durationISO8601: 'PT29M30S',
  embedUrl:
    'https://polling.test.bbc.co.uk/ws/av-embeds/media/korean/externalId/id/ko?morph_env=live',
  imageUrl: 'ichef.bbci.co.uk/images/ic/$recipe/p063j1dv.jpg',
  episodeAvailableFrom: 1587655800000,
};

describe('StructuredData', () => {
  shouldMatchSnapshot(
    'should render StructuredData correctly',
    <StructuredData {...props} />,
  );
});
