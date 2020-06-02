import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import VideoLinkedData from './VideoLinkedData';

const props = {
  promoBrandTitle: 'نړۍ دا وخت',
  shortSynopsis:
    'د بي بي سي پښتو ټلویزیوني خپرونه چې هره ورځ د افغانستان په شپږ بجو په ژوندۍ بڼه خپرېږي. دلته یې لیدلی شئ.',
  durationISO8601: 'PT24M',
  embedUrl:
    'https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/masterBrand/id/ps?morph_env=live',
  thumbnailImageUrl: 'https://ichef.bbci.co.uk/images/ic/1024x576/p063j1dv.jpg',
  releaseDateTimeStamp: 1590537600000,
};

describe('VideoLinkedData', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <VideoLinkedData {...props} />,
  );
});
