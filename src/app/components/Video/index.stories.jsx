import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Video from './index';

const videoData = arrayOfBlocks => ({
  type: 'video',
  model: {
    blocks: arrayOfBlocks,
  },
});

const rawVideoBlock = {
    "type": "rawVideo",
    "model": {
      "guidance": null,
      "isLive": false,
      "duration": "PT2H34M25S",
      "locator": "urn:bbc:pips:pid:p064nsyw"
}
};

const justVideoBlock = videoData([
    rawVideoBlock,
  ]);

storiesOf('Video', module).add('just raw video', () => (
  <Video {...justVideoBlock} />
));

