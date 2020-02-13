import deepClone from 'ramda/src/clone';
import addBylineBlock from '.';

const styInput = {
  metadata: { type: 'STY' },
  promo: {
    byline: {
      name: 'Foo Bar',
      title: 'BBC News Title',
      persons: [
        {
          name: 'Foo Bar',
        },
      ],
    },
  },
  content: {
    model: {
      blocks: [
        {
          type: 'headline',
        },
        {
          type: 'image',
        },
        {
          type: 'timestamp',
        },
      ],
    },
  },
};

describe('addBylineBlock', () => {
  it('should add a block of type byline after the first headline block', async () => {
    const input = deepClone(styInput);
    const expected = {
      metadata: { type: 'STY' },
      promo: {
        byline: {
          name: 'Foo Bar',
          title: 'BBC News Title',
          persons: [
            {
              name: 'Foo Bar',
            },
          ],
        },
      },
      content: {
        model: {
          blocks: [
            {
              type: 'headline',
            },
            {
              type: 'byline',
              model: {
                blocks: [
                  {
                    name: 'Foo Bar',
                    title: 'BBC News Title',
                  },
                ],
              },
            },
            {
              type: 'image',
            },
            {
              type: 'timestamp',
            },
          ],
        },
      },
    };

    expect(addBylineBlock(input)).toEqual(expected);
  });

  it('should add a block of type byline using the persons array when byline has no title and name properties', async () => {
    const input = deepClone(styInput);
    delete input.promo.byline.name;
    delete input.promo.byline.title;

    input.promo.byline.persons[0].function = 'BBC News Title';
    const expected = {
      metadata: { type: 'STY' },
      promo: {
        byline: {
          persons: [
            {
              name: 'Foo Bar',
            },
          ],
        },
      },
      content: {
        model: {
          blocks: [
            {
              type: 'headline',
            },
            {
              type: 'byline',
              model: {
                blocks: [
                  {
                    name: 'Foo Bar',
                    title: 'BBC News Title',
                  },
                ],
              },
            },
            {
              type: 'image',
            },
            {
              type: 'timestamp',
            },
          ],
        },
      },
    };

    expected.promo.byline.persons[0].function = 'BBC News Title';

    expect(addBylineBlock(input)).toEqual(expected);
  });

  it('should return input if blocks is not defined', () => {
    const input = deepClone(styInput);
    delete input.content.model.blocks;

    expect(addBylineBlock(input)).toEqual(input);
  });

  it('should return input if page type is not STY', () => {
    const input = deepClone(styInput);
    input.metadata.type = 'PGL';

    expect(addBylineBlock(input)).toEqual(input);
  });

  it('should return input if promo has no byline property', () => {
    const input = deepClone(styInput);
    delete input.promo.byline;

    expect(addBylineBlock(input)).toEqual(input);
  });
});
