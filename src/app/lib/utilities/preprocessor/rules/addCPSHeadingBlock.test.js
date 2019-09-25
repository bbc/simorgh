import { clone } from 'ramda';
import transformer, { headingResolver } from './addCPSHeadingBlock';
import realExample from '#data/japanese/mediaAssetPage/video-23248670.json';

const fixture = {
  metadata: {},
  promo: {
    headlines: {
      headline: 'Default headline',
    },
  },
  content: {
    blocks: [
      {
        text: 'Lonely block :(',
        markupType: 'plain_text',
        type: 'paragraph',
      },
    ],
  },
};

describe('addCPSHeadingBlock', () => {
  it('handles basic case', () => {
    const expectedResult = clone(fixture);
    expectedResult.content.blocks = [
      {
        text: fixture.promo.headlines.headline,
        markupType: 'plain_text',
        type: 'heading',
      },
      ...expectedResult.content.blocks,
    ];

    expect(transformer(fixture)).toStrictEqual(expectedResult);
  });

  it('handles real case', () => {
    const countBlocks = payload => {
      if (!payload || !payload.content || !payload.content.blocks) {
        return 0;
      }
      return payload.content.blocks.length || 0;
    };

    const output = transformer(realExample);

    expect(countBlocks(output)).toBe(countBlocks(realExample) + 1);
    expect(output.content.blocks[0].type).toBe('heading');
  });
});

// Heading Resolver Tests
const scaffold = input => ({
  shortHeadline: 'Default Short Headline',
  headline: 'Default headline',
  ...input,
});

const scenarios = [
  {
    name: 'Basic case',
    input: scaffold({ headline: 'WS Media' }),
    output: 'WS Media',
  },
  {
    name: 'Internal HTML Tag',
    input: scaffold({ headline: 'WS <bold>Media</bold> Headline' }),
    output: 'WS Media Headline',
  },
  {
    name: 'Surrounding HTML Tag',
    input: scaffold({ headline: '<bold>WS Media</bold>' }),
    output: 'WS Media',
  },
  {
    name: 'Self closing HTML',
    input: scaffold({ headline: 'WS<hr /> Media' }),
    output: 'WS Media',
  },
  {
    name: 'Malformed HTML A',
    input: scaffold({ headline: 'WS<bold> Media' }),
    output: 'WS Media',
  },
  {
    name: 'Malformed HTML B',
    input: scaffold({ headline: 'WS<bold> Media</em>' }),
    output: 'WS Media',
  },
  {
    name: 'Quotes',
    input: scaffold({ headline: 'WS "Media"' }),
    output: 'WS "Media"',
  },
  {
    name: 'Special Characters',
    input: scaffold({ headline: 'WS Media þ ¼ © M' }),
    output: 'WS Media þ ¼ © M',
  },
  {
    name: 'Chaos',
    input: scaffold({
      headline: 'WS<hr /> Media © "Quote" Boldy <bold>McBoldFace</bold></em>',
    }),
    output: 'WS Media © "Quote" Boldy McBoldFace',
  },
];

describe('AddCPSHeadingBlock - Heading Resolver', () => {
  scenarios.forEach(scenario => {
    it(`Handles ${scenario.name}`, () => {
      expect(headingResolver(scenario.input)).toBe(scenario.output);
    });
  });
});
