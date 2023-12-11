import encodeText from './encodeText';

const sampleContent = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          text: 'Inline link Kitaaba kana keessa barreeffamni jiru akka jedhutti, pirezedaantichi akka dhuunfaa isaaniitti garee gargaarsaaf yaada yeroo dhiyeessan.',
          blocks: [
            {
              type: 'urlLink',
              model: {
                text: 'Inline link',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'Inline link',
                    },
                  },
                ],
              },
            },
            {
              type: 'fragment',
              model: {
                text: ' Kitaaba kana keessa barreeffamni jiru akka jedhutti, pirezedaantichi akka dhuunfaa isaaniitti garee gargaarsaaf ',
              },
            },
            {
              type: 'urlLink',
              model: {
                text: 'yaada yeroo dhiyeessan',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'yaada yeroo dhiyeessan',
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

describe('encodeText', () => {
  it('Encodes all nested text blocks', () => {
    const input = sampleContent;

    const actual = encodeText(input);

    expect(true).toBe(actual);
  });
});
