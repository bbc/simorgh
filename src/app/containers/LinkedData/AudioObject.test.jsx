import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import AudioObject from './AudioObject';

const props = {
  name: 'ماښامنۍ خپرونه',
  description: 'د بي بي سي ورلډ سروس څخه پروګرام کول',
  duration: 'PT29M30S',
  embedURL:
    'https://polling.test.bbc.co.uk/ws/av-embeds/media/korean/externalId/id/ko?morph_env=live',
  thumbnailUrl: 'https://ichef.bbci.co.uk/images/ic/1024x576/p063j1dv.jpg',
  uploadDate: '2020-04-23T15:30:00.000Z',
};

describe('AudioObject', () => {
  shouldMatchSnapshot(
    'should render AudioObject correctly',
    <AudioObject {...props} />,
  );
});
