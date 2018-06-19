import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Image from './index';

const dataWithAltText = {
  blocks: [
    {
      blockId: '',
      type: 'image',
      model: {
        blocks: [
          {
            blockId: '',
            type: 'rawImage',
            model: {
              width: 640,
              height: 420,
              locator:
                '/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
              originCode: null,
              copyrightHolder: 'BBC',
            },
          },
          {
            blockId: '',
            type: 'altText',
            model: {
              blocks: [
                {
                  blockId: '',
                  type: 'text',
                  model: {
                    blocks: [
                      {
                        type: 'paragraph',
                        blockId: '',
                        model: {
                          text:
                            'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

storiesOf('Image', module).add('default', () => <Image {...dataWithAltText} />);
