import encodeText, { Counter, decoder } from './encodeText';

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
    console.log(dict);
    expect(sampleExpected).toStrictEqual(actual);
  });

  it('Decodes all nested text blocks', () => {
    const actual = decoder('5,7,2,3,4', sampleClientDictionary);
    console.log('CHECL', actual);
    expect(actual).toStrictEqual('Hello now, how are you?');
  });
});
