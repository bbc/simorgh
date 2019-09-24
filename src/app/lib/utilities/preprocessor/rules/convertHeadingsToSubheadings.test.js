import transformer from './convertHeadingsToSubheadings';
import realExample from '#data/japanese/mediaAssetPage/video-23248670.json';
import clone from 'ramda/clone';

const fixture = {
    metadata: {},
    content: {
        blocks: [{
            "text": "Big heading",
            "markupType": "plain_text",
            "type": "heading"
        },
        {
            "text": "Don't touch me",
            "markupType": "plain_text",
            "type": "paragraph"
        },
        {
            "text": "Heading!",
            "markupType": "plain_text",
            "type": "heading"
        }]
    },
}

describe('', () => {
    it('', () => {
        const expectedResult = clone(fixture);
        fixture.content.blocks[0].type = 'subheading';
        fixture.content.blocks[2].type = 'subheading';

        expect(transformer(fixture)).toBe(expectedResult);
    });
    it('', () => {
        const numberOfHeadings = 0; //todo

        // do transform

        // make sure number of headings == 0;
        // make sure number of subheadings == original headings count
    });
});

