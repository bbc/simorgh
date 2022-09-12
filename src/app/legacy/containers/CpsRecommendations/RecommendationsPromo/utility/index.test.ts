import path from 'ramda/src/path';
import optimoToCPSImage from '.';
import { optimoRecommendation } from '../fixture';

const imageBlock = path(['images'], optimoRecommendation);

describe('OptimoToCPSImage', () => {
  it('should convert an optimo image block to cps block', () => {
    expect(optimoToCPSImage({ cpsImage: imageBlock })).toEqual({
      altText: 'dolar TL ',
      copyrightHolder: 'Getty Images',
      height: 575,
      optimoLocator: '98dd/live/59717db0-1f53-11ed-aa9d-57accb179502.jpg',
      optimoOriginCode: 'cpsprodpb',
      width: 1023,
    });
  });

  it('should return null if no block is passed in', () => {
    expect(optimoToCPSImage({ cpsImage: null })).toBeNull();
  });
});
