import deepClone from 'ramda/src/clone';
import applyTimestampRules from '.';

const paragraphBlock = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          blocks: [
            {
              type: 'fragment',
              model: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                attributes: [],
              },
            },
          ],
        },
      },
    ],
  },
};

const imageBlock = {
  type: 'image',
  model: {
    blocks: [
      {
        type: 'rawImage',
        model: {
          copyrightHolder: 'TEST-HOLDER',
          height: 360,
          locator: 'test-image.jpg',
          originCode: null,
          width: 640,
        },
      },
      {
        type: 'caption',
        model: {
          blocks: [paragraphBlock],
        },
      },
      {
        type: 'altText',
        model: {
          blocks: [paragraphBlock],
        },
      },
    ],
  },
};

const headlineBlock = {
  type: 'headline',
  model: {
    blocks: [paragraphBlock],
  },
};

const visuallyHiddenHeadline = {
  type: 'visuallyHiddenHeadline',
  model: {
    blocks: [paragraphBlock],
  },
};

const fauxHeadline = {
  type: 'fauxHeadline',
  model: {
    blocks: [paragraphBlock],
  },
};

const aresMediaBlock = {
  type: 'aresMedia',
  model: {
    blocks: [
      {
        type: 'aresMediaMetadata',
        blockId: 'test:block:id',
        model: {
          advertising: false,
          caption: null,
          embedding: false,
          format: 'audio_video',
          id: 'test-id',
          image: null,
          imageCopyright: 'BBC TEST',
          imageUrl: 'test-image.jpg',
          subType: 'clip',
          synopses: {},
          title: 'Lorem ipsum dolor sit amet',
          versions: [],
        },
      },
      imageBlock,
    ],
  },
};

const generatedTimestampBlock = {
  type: 'timestamp',
  model: {
    firstPublished: 1514808060000,
    lastPublished: 1514811600000,
  },
};

describe('Timestamp rules', () => {
  it('should put Timestamp block after headline and image, if headline exists with image immediately after it', () => {
    const fixtureData = {
      metadata: {
        firstPublished: 1514808060000,
        lastPublished: 1514811600000,
      },
      content: {
        model: {
          blocks: [paragraphBlock, headlineBlock, imageBlock],
        },
      },
    };
    const expectedTransform = Object.assign(deepClone(fixtureData), {
      content: {
        model: {
          blocks: [
            paragraphBlock,
            headlineBlock,
            imageBlock,
            generatedTimestampBlock,
          ],
        },
      },
    });
    expect(applyTimestampRules(fixtureData)).toEqual(expectedTransform);
  });

  it('should put Timestamp block after headline and type aresMedia, if headline exists with type aresMedia immediately after it', () => {
    const fixtureData = {
      metadata: {
        firstPublished: 1514808060000,
        lastPublished: 1514811600000,
      },
      content: {
        model: {
          blocks: [paragraphBlock, headlineBlock, aresMediaBlock],
        },
      },
    };
    const expectedTransform = Object.assign(deepClone(fixtureData), {
      content: {
        model: {
          blocks: [
            paragraphBlock,
            headlineBlock,
            aresMediaBlock,
            generatedTimestampBlock,
          ],
        },
      },
    });
    expect(applyTimestampRules(fixtureData)).toEqual(expectedTransform);
  });

  it('should put Timestamp block after fauxHeadline, if no headline exists', () => {
    const fixtureData = {
      metadata: {
        firstPublished: 1514808060000,
        lastPublished: 1514811600000,
      },
      content: {
        model: {
          blocks: [visuallyHiddenHeadline, aresMediaBlock, fauxHeadline],
        },
      },
    };
    const expectedTransform = Object.assign(deepClone(fixtureData), {
      content: {
        model: {
          blocks: [
            visuallyHiddenHeadline,
            aresMediaBlock,
            fauxHeadline,
            generatedTimestampBlock,
          ],
        },
      },
    });
    expect(applyTimestampRules(fixtureData)).toEqual(expectedTransform);
  });

  it('should put Timestamp block first if no headline', () => {
    const fixtureData = {
      metadata: {
        firstPublished: 1514808060000,
        lastPublished: 1514811600000,
      },
      content: {
        model: {
          blocks: [paragraphBlock],
        },
      },
    };
    const expectedTransform = Object.assign(deepClone(fixtureData), {
      content: {
        model: {
          blocks: [generatedTimestampBlock, paragraphBlock],
        },
      },
    });
    expect(applyTimestampRules(fixtureData)).toEqual(expectedTransform);
  });

  it('should put Timestamp block after Headline if headline exists, with no image or aresMedia immediately after it', () => {
    const fixtureData = {
      metadata: {
        firstPublished: 1514808060000,
        lastPublished: 1514811600000,
      },
      content: {
        model: {
          blocks: [headlineBlock, paragraphBlock],
        },
      },
    };
    const expectedTransform = Object.assign(deepClone(fixtureData), {
      content: {
        model: {
          blocks: [headlineBlock, generatedTimestampBlock, paragraphBlock],
        },
      },
    });
    expect(applyTimestampRules(fixtureData)).toEqual(expectedTransform);
  });
});
