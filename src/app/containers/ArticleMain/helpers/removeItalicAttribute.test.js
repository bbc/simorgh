import removeItalicAttribute from './removeItalicAttribute';
import deepGet from '../../../lib/utilities/deepGet';

const singleTextBlock = (text, blocks) => {
  return {
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text,
            blocks,
          },
        },
      ],
    },
  };
};

const singleTextFragment = (text, attributes) => {
  return {
    type: 'fragment',
    model: {
      text,
      attributes,
    },
  };
};

const singleInlineFragment = (text, attributes, language) => {
  return {
    type: 'inline',
    model: {
      text,
      blocks: [
        {
          type: 'fragment',
          model: {
            text,
            attributes,
          },
        },
      ],
      language,
    },
  };
};

const farsiHeadlineOne = singleTextFragment('جام جهانی ', []);
const farsiHeadlineTwo = singleTextFragment('فوتبال', ['italic']);
const farsiHeadlineThree = singleTextFragment(
  ' زنان؛ تفاوت دستمزد با مردان چقدر است؟',
  [],
);

const englishFragment = singleInlineFragment(
  "FIFA Women's World Cup",
  ['italic'],
  'en-gb',
);

const farsiParagraph = singleTextBlock(
  'جام جهانی فوتبال زنان؛ تفاوت دستمزد با مردان چقدر است؟',
  [farsiHeadlineOne, farsiHeadlineTwo, farsiHeadlineThree],
);

const mixedParagraph = singleTextBlock(
  'جام جهانی فوتبال زنان؛ تفاوت دستمزد با مردان چقدر است؟',
  [farsiHeadlineOne, englishFragment, farsiHeadlineThree],
);

describe('removeItalicAttribute', () => {
  it('should remove italic attribute for farsi blocks', () => {
    const result = removeItalicAttribute([farsiParagraph]);
    const secondFragmentAttribute = deepGet(
      [
        [0],
        'model',
        'blocks',
        [0],
        'model',
        'blocks',
        [1],
        'model',
        'attributes',
      ],
      result,
    );
    // this expectation tests for mutations on the original data object
    expect(
      deepGet(
        ['model', 'blocks', [0], 'model', 'blocks', [1], 'model', 'attributes'],
        farsiParagraph,
      ),
    ).toEqual(['italic']);
    expect(secondFragmentAttribute).toEqual([]);
  });

  it('should not remove italic attribute for english language blocks', () => {
    const result = removeItalicAttribute([mixedParagraph]);
    const secondFragmentAttribute = deepGet(
      [
        [0],
        'model',
        'blocks',
        [0],
        'model',
        'blocks',
        [1],
        'model',
        'attributes',
      ],
      result,
    );
    // this expectation tests for mutations on the original data object
    expect(
      deepGet(
        [
          'model',
          'blocks',
          [0],
          'model',
          'blocks',
          [1],
          'model',
          'blocks',
          [0],
          'model',
        ],
        mixedParagraph,
      ),
    ).toEqual(['italic']);
    expect(secondFragmentAttribute).toEqual(['italic']);
  });
});
