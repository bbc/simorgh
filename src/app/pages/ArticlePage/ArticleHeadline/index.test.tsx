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

  describe('with toggle enabled', () => {
    const toggles = { articleLiteSiteLink: { enabled: true } };

    it('should be displayed on canonical', async () => {
      const { container, queryByRole } = render(
        <ArticleHeadline {...headlineBlock} />,
        {
          service: 'gahuza',
          toggles: { articleLiteSiteLink: { enabled: true } },
        },
      );

      const liteSiteLink = queryByRole('link', {
        name: /Inyandiko gusa/,
      });

      expect(liteSiteLink).toBeInTheDocument();

      expect(container).toMatchSnapshot();
    });

    it('should not be displayed on AMP', async () => {
      const { queryByRole } = render(<ArticleHeadline {...headlineBlock} />, {
        service: 'gahuza',
        isAmp: true,
        toggles,
      });

      const liteSiteLink = queryByRole('link', {
        name: /Inyandiko gusa/,
      });

      expect(liteSiteLink).not.toBeInTheDocument();
    });

    it('should not be displayed on .app', async () => {
      const { queryByRole } = render(<ArticleHeadline {...headlineBlock} />, {
        service: 'gahuza',
        isApp: true,
        toggles,
      });

      const liteSiteLink = queryByRole('link', {
        name: /Inyandiko gusa/,
      });

      expect(liteSiteLink).not.toBeInTheDocument();
    });

    it('should not be displayed on .lite', async () => {
      const { queryByRole } = render(<ArticleHeadline {...headlineBlock} />, {
        service: 'gahuza',
        isLite: true,
        toggles,
      });

      const liteSiteLink = queryByRole('link', {
        name: /Inyandiko gusa/,
      });

      expect(liteSiteLink).not.toBeInTheDocument();
    });
  });

  describe('with toggle disabled', () => {
    const toggles = { articleLiteSiteLink: { enabled: false } };

    it('should not be displayed on canonical', async () => {
      const { container } = render(<ArticleHeadline {...headlineBlock} />, {
        service: 'gahuza',
        toggles,
      });

      expect(container).toMatchSnapshot();
    });

    it('should not be displayed on AMP', async () => {
      const { queryByRole } = render(<ArticleHeadline {...headlineBlock} />, {
        service: 'gahuza',
        isAmp: true,
        toggles,
      });

      const liteSiteLink = queryByRole('link', { name: /Inyandiko gusa/ });

      expect(liteSiteLink).not.toBeInTheDocument();
    });

    it('should not be displayed on .app', async () => {
      const { queryByRole } = render(<ArticleHeadline {...headlineBlock} />, {
        service: 'gahuza',
        isApp: true,
        toggles,
      });

      const liteSiteLink = queryByRole('link', {
        name: /Inyandiko gusa/,
      });

      expect(liteSiteLink).not.toBeInTheDocument();
    });

    it('should not be displayed on .lite', async () => {
      const { queryByRole } = render(<ArticleHeadline {...headlineBlock} />, {
        service: 'gahuza',
        isLite: true,
        toggles,
      });

      const liteSiteLink = queryByRole('link', {
        name: /Inyandiko gusa/,
      });

      expect(liteSiteLink).not.toBeInTheDocument();
    });
  });
});
