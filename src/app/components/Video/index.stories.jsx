import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Video from './index';

// const videoData = arrayOfBlocks => ({
//   type: 'video',
//   model: {
//     blocks: arrayOfBlocks,
//   },
// });

// const rawVideoBlock = {
//     "type": "rawVideo",
//     "model": {
//       "guidance": null,
//       "isLive": false,
//       "duration": "PT2H34M25S",
//       "locator": "urn:bbc:pips:pid:p064nsyw"
// }
// };


const data = {
  "blockId": "163ab733-b2ff-452a-a2b0-ba13f1a01fa1",
  "type": "video",
  "model": {
    "locator": "urn:bbc:pips:pid:p064nsyw",
    "blocks": [
      {
        "blockId": "1269ae82-776b-a9c8-affe-1033d2f4459f",
        "type": "rawVideo",
        "model": {
          "guidance": null,
          "isLive": false,
          "allowOffsiteEmbedding": false,
          "locator": "urn:bbc:pips:pid:p064nsyw",
          "versionID": "p064nsz3",
          "kind": "clip",
          "duration": 299
        }
      },
      {
        "blockId": "2e24f33d-77c2-c62e-0353-e14dc8276e3e",
        "type": "altText",
        "model": {
          "blocks": [
            {
              "blockId": "0cb5e07f-9881-d1d1-31a7-727e295eaa67",
              "type": "text",
              "model": {
                "blocks": [
                  {
                    "type": "paragraph",
                    "blockId": "dc943001-529b-5545-41c3-0456e6a7ae5d",
                    "model": {
                      "text": "This video shows Marks and Spencer CEO talking about the announcement earlier this morning"
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "blockId": "34c923d7-b86e-6e63-bc3a-96d183ae55ed",
        "type": "image",
        "model": {
          "blocks": [
            {
              "blockId": "b4d778d9-b1fc-11fc-cf65-1afe5ed93c22",
              "type": "rawImage",
              "model": {
                "width": 640,
                "height": 420,
                "locator": "/cpsprodpb/5BD5/production/_101690532_2.jpg",
                "originCode": null,
                "copyrightHolder": "NASA"
              }
            },
            {
              "blockId": "8a285581-eb53-0aea-b4ba-d575edbc7d71",
              "type": "altText",
              "model": {
                "blocks": [
                  {
                    "blockId": "ce40c253-3fff-a227-b27d-e2da5bc248e8",
                    "type": "text",
                    "model": {
                      "blocks": [
                        {
                          "type": "paragraph",
                          "blockId": "415a1cc9-1448-170e-f835-dabf9ed6171a",
                          "model": {
                            "text": "Cras accumsan rhoncus ipsum, et consequat ex commodo pulvinar."
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
};

// const justVideoBlock = videoData([
//     rawVideoBlock,
//   ]);

storiesOf('Video', module).add('just raw video', () => (
  <Video {...data} />
));

