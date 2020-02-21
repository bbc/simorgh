import clone from 'ramda/src/clone';
import convertImage from '.';
import {
  cpsImageBlock,
  captionBlock,
  altTextBlock,
  rawImageBlock,
} from './fixture';

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
});
