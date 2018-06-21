import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Headline from './index';

const props = {
  blocks: [
    {
      model: {
        blocks: [
          {
            model: {
              text: 'This is a headline!',
            },
          },
        ],
      },
    },
  ],
};

storiesOf('Headline', module).add('default', () => <Headline {...props} />);
