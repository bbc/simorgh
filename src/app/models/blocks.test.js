import { videoBlock, rawVideoBlock, blockContainingText, blockBase, rawImageBlock, stdArrayModelBlock, blockArrayModel, imageBlock, rawImageModel } from './blocks';

const testModel = {
    type: "testingType",
    model: "TheModel"
}

const rawBlock = (t) => ({
    type: t,
    model: testModel
});

const rawBlockTest = (type, blockFunction) =>(
    describe('Raw Video Block', () => {
        const raw = blockFunction(testModel);
        const block = rawBlock(type);
        test('takes a Raw Image Model and outputs the correct json', () => {
            expect(raw).toEqual(block);
        });
    })
);

describe('Block Containing Text', () => {
    test('yes', () => {
        const testJson = {
            type: "TheType",
            model: {
                    blocks: [
                      {
                        type: 'text',
                        model: {
                          blocks: [
                            {
                              type: 'paragraph',
                              model: {
                                text: "hello"
                              },
                            },
                          ],
                        },
                      },
                    ],
                  }
        };
        
        const block = blockContainingText("TheType", "hello");

        expect(block).toEqual(testJson);
        
    });
});

describe('BlockBase', () => {
    test('outputs the proper json', () => {
        const block = blockBase("testingType", "TheModel");
        expect(block).toEqual(testModel);
    });
});
  
describe('Block Array Model', () => {
    test('yes', () => {
        const testJson = {
            blocks: [
                testModel
            ]
        }
        const block = blockArrayModel([testModel]);
        expect(block).toEqual(testJson);
        
    });
});

describe('Raw Image Model', () => {
    test('yes', () => {
        const testJson = {
            locator: "here"
        }
        const block = rawImageModel("here");
        expect(block).toEqual(testJson);
        
    });
});

describe('Std Array Model Block', () => {
    test('yes', () => {
        const composite = {
            type: "test",
            model: {
                blocks: [
                    testModel
                ]
            }
        };
        const stdArrayModel = stdArrayModelBlock("test", [testModel]);
        expect(stdArrayModel).toEqual(composite);
        
    });
});

rawBlockTest("rawVideo" , rawVideoBlock);

rawBlockTest("rawImage", rawImageBlock);


describe('Image Block', () => {
    test('yes', () => {
        const composite = {
            type: "image",
            model: {
                blocks: [
                    testModel
                ]
            }
        };
        const generatedBlock = imageBlock(testModel);
        
        expect(generatedBlock).toEqual(composite);
        
    });
});

describe('Video Block', () => {
    test('yes', () => {
        const testJson = {
            type: "video",
            model: {
                blocks: [
                    testModel,
                    testModel
                ]
            }
        };
        const generatedBlock = videoBlock(testModel, testModel);
        expect(generatedBlock).toEqual(testJson);
        
    });
});