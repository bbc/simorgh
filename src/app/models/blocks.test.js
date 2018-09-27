import {
  videoBlock,
  rawVideoBlock,
  blockContainingText,
  blockBase,
  rawImageBlock,
  stdArrayModelBlock,
  blockArrayModel,
  imageBlock,
  rawImageModel,
} from './blocks';

const testModel = {
  type: 'testingType',
  model: 'TheModel',
};

const rawBlock = type => ({
  type,
  model: testModel,
});

describe('Block Containing Text', () => {
  test('generates the appropriate block json', () => {
    const testJson = {
      type: 'TheType',
      model: {
        blocks: [
          {
            type: 'text',
            model: {
              blocks: [
                {
                  type: 'paragraph',
                  model: {
                    text: 'hello',
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const block = blockContainingText('TheType', 'hello');

    expect(block).toEqual(testJson);
  });
});

describe('Standard block abstractions', () => {
  test('blockBase outputs the standard model object containing the type and the model', () => {
    const block = blockBase('testingType', 'TheModel');
    expect(block).toEqual(testModel);
  });
  test('blockArrayModel generates the array of models in json', () => {
    const testJson = {
      blocks: [testModel],
    };
    const block = blockArrayModel([testModel]);
    expect(block).toEqual(testJson);
  });
  test('stdArrayModelBlock generates the model in blocks in a model json structure', () => {
    const composite = {
      type: 'test',
      model: {
        blocks: [testModel],
      },
    };
    const stdArrayModel = stdArrayModelBlock('test', [testModel]);
    expect(stdArrayModel).toEqual(composite);
  });
});

describe('Raw Block Tests', () => {
  const rawBlockTest = (testDescription, type, blockFunction) =>
    test(testDescription, () => {
      const raw = blockFunction(testModel);
      const block = rawBlock(type);
      expect(raw).toEqual(block);
    });

  rawBlockTest(
    'rawVideoBlock generates the correct json',
    'rawVideo',
    rawVideoBlock,
  );
  rawBlockTest(
    'rawImageBlock generates the correct json',
    'rawImage',
    rawImageBlock,
  );

  test('rawImageModel', () => {
    const testJson = {
      locator: 'here',
    };
    const block = rawImageModel('here');
    expect(block).toEqual(testJson);
  });
});

describe('High order blocks', () => {
  test('Image block builder generates the image block containing the standard array block', () => {
    const composite = {
      type: 'image',
      model: {
        blocks: [testModel],
      },
    };
    const generatedBlock = imageBlock(testModel);

    expect(generatedBlock).toEqual(composite);
  });

  test('Video block builder generates the video block containging a model of a block array with at least two models', () => {
    const testJson = {
      type: 'video',
      model: {
        blocks: [testModel, testModel],
      },
    };
    const generatedBlock = videoBlock(testModel, testModel);
    expect(generatedBlock).toEqual(testJson);
  });
});
