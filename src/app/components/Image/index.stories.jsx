import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Image from './index';

const dataWithAltText = {
  type: 'image',
  model: {
    blocks: [
      {
        type: 'rawImage',
        model: {
          locator:
            '/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
        },
      },
      {
        type: 'altText',
        model: {
          blocks: [
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
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
};

storiesOf('Image', module).add('default', () => <Image {...dataWithAltText} />);
