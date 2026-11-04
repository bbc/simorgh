import russianArticle from '#data/russian/articles/c6wyzl2xdyz2o.json';
import blocksToMarkdown from '.';

describe('blocksToMarkdown', () => {
  it('renders headings, nested paragraphs and plain paragraphs', () => {
    expect(
      blocksToMarkdown([
        {
          type: 'headline',
          model: {
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [{ type: 'paragraph', model: { text: 'Headline' } }],
                },
              },
            ],
          },
        },
        { type: 'subheadline', model: { text: 'Subheadline' } },
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
                model: {
                  blocks: [
                    { type: 'fragment', model: { text: 'First ' } },
                    { type: 'fragment', model: { text: 'paragraph' } },
                  ],
                },
              },
              { type: 'paragraph', model: { text: 'Second paragraph' } },
            ],
          },
        },
      ]),
    ).toBe(
      '# Headline\n\n## Subheadline\n\nFirst paragraph\n\nSecond paragraph',
    );
  });

  it('renders images independently of child block order', () => {
    expect(
      blocksToMarkdown([
        {
          type: 'image',
          model: {
            blocks: [
              { type: 'caption', model: { text: 'Caption' } },
              {
                type: 'rawImage',
                model: { locator: 'image.jpg', originCode: 'cpsprodpb' },
              },
              { type: 'altText', model: { text: 'Image description' } },
            ],
          },
        },
      ]),
    ).toBe(
      '![Image description](https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/image.jpg.webp)',
    );
  });

  it.each([
    ['1. Literal numbered text', '1\\. Literal numbered text'],
    ['# Literal heading', '\\# Literal heading'],
    ['> Literal quote', '\\> Literal quote'],
    ['- Literal list', '\\- Literal list'],
    [
      '*literal* _text_ [link](url)',
      '\\*literal\\* \\_text\\_ \\[link\\]\\(url\\)',
    ],
    ['`code` <tag> &copy;', '\\`code\\` \\<tag\\> \\&copy;'],
    ['Literal\n===', 'Literal\n\\=\\=\\='],
    ['A \\ B', 'A \\\\ B'],
  ])('escapes literal paragraph text: %s', (text, expected) => {
    expect(blocksToMarkdown([{ type: 'paragraph', model: { text } }])).toBe(
      expected,
    );
  });

  it('escapes text fragments before adding heading syntax', () => {
    expect(
      blocksToMarkdown([
        {
          type: 'headline',
          model: {
            blocks: [
              { type: 'fragment', model: { text: '# [Literal]' } },
              { type: 'fragment', model: { text: '*heading*' } },
            ],
          },
        },
      ]),
    ).toBe('# \\# \\[Literal\\]\\*heading\\*');
  });

  it('escapes image descriptions without breaking image syntax', () => {
    expect(
      blocksToMarkdown([
        {
          type: 'image',
          model: {
            blocks: [
              {
                type: 'rawImage',
                model: { locator: 'image.jpg', originCode: 'cpsprodpb' },
              },
              { type: 'altText', model: { text: 'An unmatched ] and *star*' } },
            ],
          },
        },
      ]),
    ).toBe(
      '![An unmatched \\] and \\*star\\*](https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/image.jpg.webp)',
    );
  });

  it('omits unsupported blocks and images without image data', () => {
    expect(
      blocksToMarkdown([
        { type: 'video', model: {} },
        { type: 'image', model: { blocks: [] } },
        { type: 'paragraph', model: { text: 'Article text' } },
      ]),
    ).toBe('Article text');
  });

  it('renders an empty article', () => {
    expect(blocksToMarkdown([])).toBe('');
  });

  it('renders the Russian article fixture without missing text placeholders', () => {
    const markdown = blocksToMarkdown(
      russianArticle.data.article.content.model.blocks,
    );

    expect(markdown).toContain('# ');
    expect(markdown).toContain('![');
    expect(markdown).not.toContain('undefined');
    expect(markdown).not.toContain('[object Object]');
  });
});
