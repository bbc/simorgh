import escapeHtmlInBlockTypes from '.';

describe('escapeHtmlInBlockTypes', () => {
  it('should escape HTML special characters in blocks of type', () => {
    const pageData = {
      content: {
        model: {
          blocks: [
            {
              type: 'social_embed',
              model: {
                embed: {
                  oembed: {
                    html: '<h1>Simorgh & Psammead</h1>',
                  },
                },
              },
            },
            {
              type: 'paragraph',
              model: {
                text: "<p>Can't Touch this.</p>",
              },
            },
            {
              type: 'social_embed',
              model: {
                embed: {
                  oembed: {
                    html: "<p>'Ello, World!</p>",
                  },
                },
              },
            },
          ],
        },
      },
    };
    expect(escapeHtmlInBlockTypes(['social_embed'])(pageData)).toEqual({
      content: {
        model: {
          blocks: [
            {
              model: {
                embed: {
                  oembed: {
                    html: '&lt;h1&gt;Simorgh &amp; Psammead&lt;/h1&gt;',
                  },
                },
              },
              type: 'social_embed',
            },
            {
              model: {
                text: "<p>Can't Touch this.</p>",
              },
              type: 'paragraph',
            },
            {
              model: {
                embed: {
                  oembed: {
                    html: '&lt;p&gt;&#39;Ello, World!&lt;/p&gt;',
                  },
                },
              },
              type: 'social_embed',
            },
          ],
        },
      },
    });
  });
});
