import { aresMediaBlocks, clipMediaBlocks } from '../fixture';
import { MediaBlock } from '../types';
import getMediaBlockType from './getMediaBlockType';

describe('getMediaBlockType', () => {
  it('Should return type "aresMedia" when provided aresMediaBlocks.', () => {
    const result = getMediaBlockType(aresMediaBlocks as MediaBlock[]);

    expect(result).toStrictEqual('aresMedia');
  });

  it('Should return type "clipMedia" when provided clipMediaBlocks.', () => {
    const result = getMediaBlockType(clipMediaBlocks as MediaBlock[]);

    expect(result).toStrictEqual('clipMedia');
  });
});
