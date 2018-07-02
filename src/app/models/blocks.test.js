import { blockBase, rawImageBlock } from './blocks';

const testModel = {
    type: "testingType",
    model: "TheModel"
}
const rawImageBlockTest = {
    type: "rawImage",
    model: testModel
}

describe('BlockBase', () => {
    test('outputs the proper json', () => {
        const block = blockBase("testingType", "TheModel")
        expect(block).toEqual(testModel);
    });
});

describe('Raw Image Block', () => {
    const raw = rawImageBlock(testModel);
    test('takes a Raw Image Model and outputs the correct json', () => {
        expect(raw).toEqual(rawImageBlockTest);
    });

});