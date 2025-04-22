import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import ArticleHeadline from '.';

const headlineBlock = {
  id: '7aa081eb',
  type: 'headline',
  blocks: [
    {
      id: '7cf597a1',
      type: 'text',
      model: {
        blocks: [
          {
            id: '4c00bb79',
            type: 'paragraph',
            model: {
              text: "'Urukundo rukomeye n'impuhwe ni byo byamurangaga' – Antoine Karidinali Kambanda yibuka Papa",
              blocks: [
                {
                  id: '83e4e7f5',
                  type: 'fragment',
                  model: {
                    text: "'Urukundo rukomeye n'impuhwe ni byo byamurangaga' – Antoine Karidinali Kambanda yibuka Papa",
                    attributes: [],
                  },
                  position: [1, 1, 1, 1],
                },
              ],
            },
            position: [1, 1, 1],
          },
        ],
      },
      position: [1, 1],
    },
  ],
  position: [1],
};

describe('ArticleHeadline - Lite Site CTA', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('with toggle enabled', async () => {
    const { container } = render(<ArticleHeadline {...headlineBlock} />, {
      service: 'gahuza',
      toggles: { liteSiteCTA: { enabled: true } },
    });

    expect(container).toMatchSnapshot();
  });

  it('with toggle disabled', async () => {
    const { container } = render(<ArticleHeadline {...headlineBlock} />, {
      service: 'gahuza',
      toggles: { liteSiteCTA: { enabled: false } },
    });

    expect(container).toMatchSnapshot();
  });
});
