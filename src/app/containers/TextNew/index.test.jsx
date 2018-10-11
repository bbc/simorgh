import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import TextWithFragmentAndUrlLink from './index';

const simpleTextBlock = {
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
};

describe('TextWithFragmentAndUrlLink', () => {
  shouldShallowMatchSnapshot(
    'should render correctly',
    <TextWithFragmentAndUrlLink {...simpleTextBlock} />,
  );
});
