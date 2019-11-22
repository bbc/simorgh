import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import BulletedListItemContainer from './index';

describe('BulletedListItemContainer', () => {
  describe('with data', () => {
    const getListItem = (id, text) => ({
      id,
      type: 'listItem',
      model: {
        blocks: [
          {
            id,
            type: 'paragraph',
            model: {
              text,
              blocks: [
                {
                  id,
                  type: 'fragment',
                  model: {
                    text,
                    attributes: [],
                  },
                },
              ],
            },
          },
        ],
      },
    });

    shouldMatchSnapshot(
      'should render text correctly',
      <BulletedListItemContainer
        {...getListItem('mock-id-1', 'This is a sample text')}
      />,
    );

    shouldMatchSnapshot(
      'should render other text correctly',
      <BulletedListItemContainer
        {...getListItem('mock-id-1', 'This is another sample text')}
      />,
    );
  });
});
