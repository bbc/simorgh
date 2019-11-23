import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import BulletedListItemContainer from './index';
import { ServiceContext } from '#contexts/ServiceContext';

describe('BulletedListItemContainer', () => {
  describe('with data', () => {
    const getListItem = (id, text) => ({
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
    });

    shouldMatchSnapshot(
      'should render text correctly',
      <ServiceContext.Provider
        value={{ script: latin, service: 'news', dir: 'ltr' }}
      >
        <BulletedListItemContainer
          {...getListItem('mock-id-1', 'This is a sample text')}
        />
      </ServiceContext.Provider>,
    );

    shouldMatchSnapshot(
      'should render other text correctly',
      <ServiceContext.Provider
        value={{ script: latin, service: 'news', dir: 'ltr' }}
      >
        <BulletedListItemContainer
          {...getListItem('mock-id-1', 'This is another sample text')}
        />
      </ServiceContext.Provider>,
    );
  });
});
