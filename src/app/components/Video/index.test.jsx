import React from 'react';
import snapshotTestHelper from '../../../__test__/snapshotTestHelper';
import Video from './index';

describe('Video', () => {
    describe('with no data' , () => {
        snapshotTestHelper.shouldMatchSnapshot(
            'should not render anything',
          <Video />,
          );
    })

    describe('with data', () => {
        const videoData = {
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

          snapshotTestHelper.shouldMatchSnapshot(
            'should render the important props in divs',
            <Video {...videoData} />
          )
    })
});