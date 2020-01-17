import transformer from '.';

import inputFixture from './inputFixture';
import outputFixture from './outputFixture';

const wrapBlock = settings => ({
  content: {
    blocks: [
      {
        type: 'paragraph',
        markupType: 'candy_xml',
        ...settings,
      },
    ],
  },
  metadata: {},
  promo: {},
  relatedContent: {},
});

const generateMeta = (...args) => {
  return args.map(([id, linkText]) => ({
    headlines: {
      headline: 'Lorem ipsum dolor sit amet, consectetur',
      overtyped: linkText,
      shortHeadline: 'Lorem ipsum dolor sit amet, consectetur',
    },
    id: `urn:bbc:ares::asset:${id}`,
    locators: {
      href: `http://www.bbc.com/${id}`,
    },
    passport: {
      category: {
        categoryId: '',
        categoryName: '',
      },
      taggings: [],
    },
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    timestamp: 1568218735000,
    type: 'cps',
  }));
};

const generateUrl = ([relativePath, linkText]) => {
  const absoluteUrl = `http://www.bbc.com/${relativePath}`;
  return `
          <link>
              <caption>${linkText}</caption>
              <altText>${linkText}</altText>
              <url href="${absoluteUrl}" platform="highweb"/>
              <url href="${absoluteUrl}" platform="enhancedmobile"/>
          </link>
      `.replace(/(\r?\n|\r)\s*/g, '');
};

const scenarios = [
  {
    name: 'Real data - Pidgin fixture',
    input: inputFixture,
    expectation: outputFixture,
  },
  {
    name: 'Basic',
    input: wrapBlock({
      meta: generateMeta(['afrique/23248423', 'Hello']),
      text: '<itemMeta>afrique/23248423</itemMeta>',
    }),
    expectation: wrapBlock({
      meta: generateMeta(['afrique/23248423', 'Hello']),
      text: generateUrl(['afrique/23248423', 'Hello']),
    }),
  },
  {
    name: 'Special Characters',
    input: wrapBlock({
      meta: generateMeta(['afrique/23248423', '<Hello&>']),
      text: '<itemMeta>afrique/23248423</itemMeta>',
    }),
    expectation: wrapBlock({
      meta: generateMeta(['afrique/23248423', '<Hello&>']),
      text: generateUrl(['afrique/23248423', '&lt;Hello&amp;&gt;']),
    }),
  },
  {
    name: 'Surrounding text',
    input: wrapBlock({
      meta: generateMeta(['afrique/23248423', 'Hello']),
      text: 'Hello <itemMeta>afrique/23248423</itemMeta> World',
    }),
    expectation: wrapBlock({
      meta: generateMeta(['afrique/23248423', 'Hello']),
      text: `Hello ${generateUrl(['afrique/23248423', 'Hello'])} World`,
    }),
  },
  {
    name: 'Multiple links',
    input: wrapBlock({
      meta: generateMeta(
        ['afrique/23248423', 'Hello'],
        ['afrique/23248424', 'World'],
      ),
      text:
        'Hello <itemMeta>afrique/23248423</itemMeta> World <itemMeta>afrique/23248424</itemMeta>',
    }),
    expectation: wrapBlock({
      meta: generateMeta(
        ['afrique/23248423', 'Hello'],
        ['afrique/23248424', 'World'],
      ),
      text: `Hello ${generateUrl([
        'afrique/23248423',
        'Hello',
      ])} World ${generateUrl(['afrique/23248424', 'World'])}`,
    }),
  },
  {
    name: 'Nested blocks',
    input: wrapBlock({
      type: 'list',
      items: [
        {
          meta: generateMeta(['afrique/23248423', 'Hello']),
          text: 'Hello <itemMeta>afrique/23248423</itemMeta> World',
        },
      ],
    }),
    expectation: wrapBlock({
      type: 'list',
      items: [
        {
          meta: generateMeta(['afrique/23248423', 'Hello']),
          text: `Hello ${generateUrl(['afrique/23248423', 'Hello'])} World`,
        },
      ],
    }),
  },
  {
    name: 'Missing metadata',
    input: wrapBlock({
      meta: generateMeta(['afrique/wat', 'Hello']),
      text: '<itemMeta>afrique/23248423</itemMeta>',
    }),
    get expectation() {
      return this.input;
    },
  },
  {
    name: 'Junk data',
    input: { hey: 'you' },
    get expectation() {
      return this.input;
    },
  },
];

describe('convert internal link transformer', () => {
  scenarios.forEach(scenario => {
    it(`should work for scenario: ${scenario.name}`, () => {
      expect(transformer(scenario.input)).toEqual(scenario.expectation);
    });
  });
});
