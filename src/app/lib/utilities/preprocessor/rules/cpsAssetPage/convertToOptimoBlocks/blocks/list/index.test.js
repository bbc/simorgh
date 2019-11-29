import convertList from '.';
import {
  CPSUnorderedListBlock,
  CPSOrderedListBlock,
  optimoUnorderedListBlock,
  optimoOrderedListBlock,
} from './fixtures';

describe('convertList', () => {
  it('should convert a mixed type unordered list to Optimo format', async () => {
    expect(await convertList(CPSUnorderedListBlock)).toEqual(
      optimoUnorderedListBlock,
    );
  });

  it('should convert an ordered list to Optimo format', async () => {
    expect(await convertList(CPSOrderedListBlock)).toEqual(
      optimoOrderedListBlock,
    );
  });
});
