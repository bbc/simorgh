import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import AudioObjectStructuredData from './AudioObjectStructuredData';

const props = {
  promoBrandTitle: 'ماښامنۍ خپرونه',
  shortSynopsis: 'د بي بي سي ورلډ سروس څخه پروګرام کول',
  durationISO8601: 'PT29M30S',
  embedUrl:
    'https://polling.test.bbc.co.uk/ws/av-embeds/media/korean/externalId/id/ko?morph_env=live',
  imageUrl: 'https://ichef.bbci.co.uk/images/ic/1024x576/p063j1dv.jpg',
  releaseDateTimeStamp: 1587655800000,
};

describe('AudioObjectStructuredData', () => {
  shouldMatchSnapshot(
    'should render AudioObjectStructuredData correctly',
    <AudioObjectStructuredData {...props} />,
  );
});
