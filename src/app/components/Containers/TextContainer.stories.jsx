import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import TextContainer from './TextContainer';

const p = {
  type: 'headline',
  model: {
    blocks: [
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
              model: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              },
            },
          ],
        },
      },
    ],
  },
};

const pl = {
  type: 'subheading',
  model: {
    blocks: [
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
              model: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              },
            },
          ],
        },
      },
    ],
  },
};

storiesOf('Text Container', module).add('passing in a headline', () => (
  <TextContainer {...p} />
));
storiesOf('Text Container', module).add('passing in a subheading', () => (
  <TextContainer {...pl} />
));

// /////////////
