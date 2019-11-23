import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import BulletedListContainer from './index';
import { ServiceContext } from '#contexts/ServiceContext';

describe('BulletedListContainer', () => {
  describe('with data', () => {
    const ltrData = {
      blocks: [
        {
          id: 'mock-id-1',
          type: 'listItem',
          model: {
            blocks: [
              {
                id: 'mock-id-a',
                type: 'paragraph',
                model: {
                  text: 'Here is a list',
                  blocks: [
                    {
                      id: 'mock-id-i',
                      type: 'fragment',
                      model: {
                        text: 'Here is a list',
                        attributes: [],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          id: 'mock-id-2',
          type: 'listItem',
          model: {
            blocks: [
              {
                id: 'mock-id-b',
                type: 'paragraph',
                model: {
                  text: 'It is unordered',
                  blocks: [
                    {
                      id: 'mock-id-i',
                      type: 'fragment',
                      model: {
                        text: 'It is unordered',
                        attributes: [],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          id: 'mock-id-3',
          type: 'listItem',
          model: {
            blocks: [
              {
                id: 'mock-id-c',
                type: 'paragraph',
                model: {
                  text: 'It has three list items',
                  blocks: [
                    {
                      id: 'mock-id-i',
                      type: 'fragment',
                      model: {
                        text: 'It has three list items',
                        attributes: [],
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

    const rtlData = {
      blocks: [
        {
          id: 'mock-id-4',
          type: 'listItem',
          model: {
            blocks: [
              {
                id: 'mock-id-a',
                type: 'paragraph',
                model: {
                  text: 'It is unordered',
                  blocks: [
                    {
                      id: 'mock-id-i',
                      type: 'fragment',
                      model: {
                        text: 'It is unordered',
                        attributes: [],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          id: 'mock-id-5',
          type: 'listItem',
          model: {
            blocks: [
              {
                id: 'mock-id-b',
                type: 'paragraph',
                model: {
                  text: 'It has three list items',
                  blocks: [
                    {
                      id: 'mock-id-i',
                      type: 'fragment',
                      model: {
                        text: 'It has three list items',
                        attributes: [],
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

    // console.log(BulletedListContainer.propTypes);

    shouldMatchSnapshot(
      'should render ltr correctly',
      <ServiceContext.Provider
        value={{ script: latin, service: 'news', dir: 'ltr' }}
      >
        <BulletedListContainer {...ltrData} />
      </ServiceContext.Provider>,
    );

    shouldMatchSnapshot(
      'should render rtl correctly',
      <ServiceContext.Provider
        value={{ script: arabic, service: 'arabic', dir: 'rtl' }}
      >
        <BulletedListContainer {...rtlData} />
      </ServiceContext.Provider>,
    );
  });
});
