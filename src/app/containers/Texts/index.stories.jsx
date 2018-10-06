import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import TextWithFragmentsAndUrlLinks from './index';

const textBlocks = {
  blocks: [
    {
      type: 'text',
      model: {
        blocks: [
          {
            type: 'paragraph',
            model: {
              lang: 'en_GB',
              script: 'latin',
              text: 'Hello, I am a single text block.',
              blocks: [
                {
                  type: 'fragment',
                  model: {
                    text: 'Hello, I am a single text block.',
                    attributes: [],
                    lang: 'en_GB',
                    script: 'latin',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: 'text',
      model: {
        blocks: [
          {
            type: 'paragraph',
            model: {
              lang: 'en_GB',
              script: 'latin',
              text:
                'I am the second text block. You should see a separator before me.',
              blocks: [
                {
                  type: 'fragment',
                  model: {
                    text:
                      'I am the second text block. You should see a separator before me.',
                    attributes: [],
                    lang: 'en_GB',
                    script: 'latin',
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

storiesOf('Texts (Using Text with Fragment & UrlLink)', module).add(
  'two text blocks',
  () => <TextWithFragmentsAndUrlLinks {...textBlocks} />,
);
