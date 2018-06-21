import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import SubHeading from './index';

const props = {
  blocks: [
    {
      model: {
        blocks: [
          {
            model: {
              text: 'Testing the SubHeading!',
            },
          },
        ],
      },
    },
  ],
};

storiesOf('SubHeading', module).add('default', () => <SubHeading {...props} />);
