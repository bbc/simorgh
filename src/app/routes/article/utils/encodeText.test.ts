import encodeText, {
  Counter,
  createClientDictionary,
  decoder,
} from './encodeText';

const sampleContent = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          text: 'Hello world, how are you?',
          blocks: [
            {
              type: 'urlLink',
              model: {
                text: 'Hello there, how are you?',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'Hello now, how are you?',
                    },
                  },
                ],
              },
            },
            {
              type: 'fragment',
              model: {
                text: 'Hello again, how are you?',
              },
            },
            {
              type: 'urlLink',
              model: {
                text: 'Hello you, how are you?',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'Good bye!',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

const sampleExpected = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          text: 123,
          blocks: [
            {
              type: 'urlLink',
              model: {
                text: 123,
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 123,
                    },
                  },
                ],
              },
            },
            {
              type: 'fragment',
              model: {
                text: 123,
              },
            },
            {
              type: 'urlLink',
              model: {
                text: 123,
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 123,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

const sampleClientDictionary = {
  5: 'Hello',
  1: 'world,',
  2: 'how',
  3: 'are',
  4: 'you?',
  6: 'there,',
  7: 'now,',
  8: 'again,',
  9: 'you,',
  10: 'Good',
  11: 'bye!',
};

describe('encodeText', () => {
  it('Encodes all nested text blocks', () => {
    const input = sampleContent;
    const dict = new Map();
    const actual = encodeText(input, dict, new Counter());
    expect(sampleExpected).toStrictEqual(actual);
  });

  it('Decodes all nested text blocks', () => {
    const actual = decoder('0,1,2', ['World', 'Hello', 'now']);
    expect(actual).toStrictEqual('World Hello now');
  });

  it('Converts dictionary to client dictionary', () => {
    const dict = new Map([
      ['Hello', 1],
      ['now', 2],
      ['World', 0],
    ]);

    const actual = createClientDictionary(dict);
    expect(actual).toStrictEqual(['World', 'Hello', 'now']);
  });
});
