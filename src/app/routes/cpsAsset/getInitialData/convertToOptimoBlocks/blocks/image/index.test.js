import clone from 'ramda/src/clone';
import convertImage from '.';
import {
  cpsImageBlock,
  captionBlock,
  altTextBlock,
  rawImageBlock,
} from './fixture';
import ukrainianInRussianPageData from '#data/ukrainian/cpsAssets/news-russian-23333960.json';

const ukrainianImageBlock = {
  altText:
    'Бег в упряжке - это прежде всего игра, ведь собака не получает немедленного вознаграждения',
  caption:
    'Бег в упряжке - это прежде всего игра, ведь собака не получает немедленного вознаграждения',
  copyrightHolder: 'Getty Images',
  height: 549,
  href:
    'http://b.files.bbci.co.uk/61FB/test/_63738052__111923538_gettyimages-645263470.jpg',
  id: '63738052',
  path: '/cpsdevpb/61FB/test/_63738052__111923538_gettyimages-645263470.jpg',
  positionHint: 'full-width',
  subType: 'body',
  type: 'image',
  width: 976,
};

describe('convertImage', () => {
  it('should convert an image cps block into an optimo one', () => {
    const expected = {
      model: {
        blocks: [captionBlock, altTextBlock, rawImageBlock],
      },
      type: 'image',
    };
    expect(convertImage(cpsImageBlock)).toEqual(expected);
  });

  it('should not include alt text block if alt text is missing', () => {
    const input = clone(cpsImageBlock);
    delete input.altText;

    const expected = {
      model: {
        blocks: [captionBlock, rawImageBlock],
      },
      type: 'image',
    };

    expect(convertImage(input)).toEqual(expected);
  });

  it('should not include caption text block if caption is missing', () => {
    const input = clone(cpsImageBlock);
    delete input.caption;

    const expected = {
      model: {
        blocks: [altTextBlock, rawImageBlock],
      },
      type: 'image',
    };

    expect(convertImage(input)).toEqual(expected);
  });

  it('should not include raw image block if path is missing', () => {
    const input = clone(cpsImageBlock);
    delete input.path;

    const expected = {
      model: {
        blocks: [captionBlock, altTextBlock],
      },
      type: 'image',
    };

    expect(convertImage(input)).toEqual(expected);
  });

  it('should display an image', () => {
    expect(
      convertImage(ukrainianImageBlock, ukrainianInRussianPageData),
    ).toMatchSnapshot();
  });
});
