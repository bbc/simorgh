import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Video from './index';

const data = {
  "type": "video",
  "model": {
    "locator": "urn:bbc:pips:pid:p064nsyw",
    "blocks": [
      {
        "type": "rawVideo",
        "model": {
          "locator": "urn:bbc:pips:pid:p064nsyw",
          "versionID": "p064nsz3",
          "kind": "clip",
          "duration": 299
        }
      },
      {
        "type": "image",
        "model": {
          "blocks": [
            {
              "type": "rawImage",
              "model": {
                "locator": "/cpsprodpb/5BD5/production/_101690532_2.jpg",
              }
            }
          ]
        }
      }
    ]
  }
};

storiesOf('Video', module).add('just raw video', () => (
  <Video {...data} />
));

