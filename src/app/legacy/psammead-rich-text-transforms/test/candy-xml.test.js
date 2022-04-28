const { candyXmlToRichText } = require('../src/index');

const createBody = inner =>
  `<body xmlns="http://www.bbc.co.uk/asset" xml:space="preserve" xml:base="http://www.bbc.co.uk/article/abc123">${inner}</body>`;

const testLink = ({ url, isExternal }) => {
  const output = candyXmlToRichText(
    createBody(`<link><caption>foo</caption><url href="${url}"/></link>`),
  );

  const expectation = {
    type: 'text',
    model: {
      blocks: [
        {
          type: 'urlLink',
          model: {
            text: 'foo',
            locator: url,
            isExternal,
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'foo',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  };

  return [output, expectation];
};

test('can parse XML with a paragraph', () => {
  const richText = candyXmlToRichText(
    createBody('<paragraph>One two three four!</paragraph>'),
  );

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: 'One two three four!',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'One two three four!',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  });
});

test('can parse XML with a link', () => {
  const [actualOutput, expectedOutput] = testLink({
    url: 'https://example.com/foo',
    isExternal: true,
  });

  expect(actualOutput).toEqual(expectedOutput);
});

test('can return a link with "isExternal: false" for "www.bbc.com"', () => {
  const [actualOutput, expectedOutput] = testLink({
    url: 'https://www.bbc.com/foo',
    isExternal: false,
  });

  expect(actualOutput).toEqual(expectedOutput);
});

test('can return a link with "isExternal: false" for "www.bbc.in"', () => {
  const [actualOutput, expectedOutput] = testLink({
    url: 'https://www.bbc.in/foo',
    isExternal: false,
  });

  expect(actualOutput).toEqual(expectedOutput);
});

test('can return a link with "isExternal: false" for "www.bbc.co.uk"', () => {
  const [actualOutput, expectedOutput] = testLink({
    url: 'https://www.bbc.co.uk/foo',
    isExternal: false,
  });

  expect(actualOutput).toEqual(expectedOutput);
});

test('can return a link with "isExternal: false" for "www.test.bbc.com"', () => {
  const [actualOutput, expectedOutput] = testLink({
    url: 'https://www.test.bbc.com/foo',
    isExternal: false,
  });

  expect(actualOutput).toEqual(expectedOutput);
});

test('can return a link with "isExternal: false" for "bbc.com"', () => {
  const [actualOutput, expectedOutput] = testLink({
    url: 'https://bbc.com',
    isExternal: false,
  });

  expect(actualOutput).toEqual(expectedOutput);
});

test('returns a plain text representation of the data', () => {
  const richText = candyXmlToRichText(
    createBody(
      '<paragraph>Read more: <link><caption>foo</caption><url href="https://example.com/foo"/></link> bar <bold>baz</bold></paragraph>',
    ),
  );

  expect(richText).toEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: 'Read more: foo bar baz',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'Read more: ',
                  attributes: [],
                },
              },
              {
                type: 'urlLink',
                model: {
                  text: 'foo',
                  locator: 'https://example.com/foo',
                  isExternal: true,
                  blocks: [
                    {
                      type: 'fragment',
                      model: {
                        text: 'foo',
                        attributes: [],
                      },
                    },
                  ],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: ' bar ',
                  attributes: [],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: 'baz',
                  attributes: ['bold'],
                },
              },
            ],
          },
        },
      ],
    },
  });
});

test('can parse XML with multiple paragraphs', () => {
  const richText = candyXmlToRichText(
    createBody(
      '<paragraph>foo</paragraph><paragraph>bar</paragraph><paragraph>baz</paragraph>',
    ),
  );

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: 'foo',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'foo',
                  attributes: [],
                },
              },
            ],
          },
        },
        {
          type: 'paragraph',
          model: {
            text: 'bar',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'bar',
                  attributes: [],
                },
              },
            ],
          },
        },
        {
          type: 'paragraph',
          model: {
            text: 'baz',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'baz',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  });
});

test('can render bold text within a paragraph', () => {
  const richText = candyXmlToRichText(
    createBody('<paragraph>One <bold>two</bold> three!</paragraph>'),
  );

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: 'One two three!',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'One ',
                  attributes: [],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: 'two',
                  attributes: ['bold'],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: ' three!',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  });
});

test('can render italic text within a paragraph', () => {
  const richText = candyXmlToRichText(
    createBody('<paragraph><italic>One</italic> two three!</paragraph>'),
  );

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: 'One two three!',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'One',
                  attributes: ['italic'],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: ' two three!',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  });
});

test('can render bold italic text within a paragraph', () => {
  const richText = candyXmlToRichText(
    createBody(
      '<paragraph><bold><italic>One</italic></bold> two three!</paragraph>',
    ),
  );

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: 'One two three!',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'One',
                  attributes: ['bold', 'italic'],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: ' two three!',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  });
});

test('can render spans within a paragraph', () => {
  const richText = candyXmlToRichText(
    createBody(
      "<paragraph>Text before span <span>I'm in a span tag</span></paragraph>",
    ),
  );

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: "Text before span I'm in a span tag",
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'Text before span ',
                  attributes: [],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: "I'm in a span tag",
                  attributes: ['span'],
                },
              },
            ],
          },
        },
      ],
    },
  });
});

test('can render bold and italic text within a paragraph', () => {
  const richText = candyXmlToRichText(
    createBody(
      '<paragraph><bold><italic>One</italic> two</bold> three!</paragraph>',
    ),
  );

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: 'One two three!',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'One',
                  attributes: ['bold', 'italic'],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: ' two',
                  attributes: ['bold'],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: ' three!',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  });
});

test('can render an empty paragraph', () => {
  const richText = candyXmlToRichText(createBody('<paragraph />'));

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: '',
            blocks: [],
          },
        },
      ],
    },
  });
});

test('returns null when given invalid xml', () => {
  const richText = candyXmlToRichText('foobar');

  expect(richText).toStrictEqual(null);
});

test('returns plain text if wrapped in an unsupport xml node', () => {
  const richText = candyXmlToRichText(
    createBody(
      '<paragraph><foobar>Struck through text</foobar> followed by normal text</paragraph>',
    ),
  );

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: 'Struck through text followed by normal text',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'Struck through text',
                  attributes: [],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: ' followed by normal text',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  });
});

test('can handle an empty XML tag', () => {
  const richText = candyXmlToRichText(
    createBody(
      '<paragraph>Some text content with <foo></foo>an empty XML tag.</paragraph>',
    ),
  );

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: 'Some text content with an empty XML tag.',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'Some text content with ',
                  attributes: [],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: 'an empty XML tag.',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  });
});

test('can handle chaos', () => {
  const richText = candyXmlToRichText(
    createBody(
      '<paragraph><foo><bar><bold><meh>Bold text in unsupported nodes</meh></bold></bar></foo> followed by normal text then <italic><this><is>some <bold>carnage<carnage></carnage></bold></is></this></italic>.</paragraph>',
    ),
  );

  expect(richText).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text:
              'Bold text in unsupported nodes followed by normal text then some carnage.',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'Bold text in unsupported nodes',
                  attributes: ['bold'],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: ' followed by normal text then ',
                  attributes: [],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: 'some ',
                  attributes: ['italic'],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: 'carnage',
                  attributes: ['italic', 'bold'],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: '.',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  });
});
