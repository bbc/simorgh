import type { OptimoBlock } from '#app/models/types/optimo';
import type { Post } from '#nextjs/pages/[service]/live/[id]/Post/types';
import * as handleCustomEmbed from '../handleCustomEmbed';
import handlePostBlocks from '.';
import * as streamFixture from './streamFixture.json';

jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

const postFixture = streamFixture.data.results[2] as Post;

describe('handlePostBlocks', () => {
  let handleCustomEmbedSpy: jest.SpyInstance<OptimoBlock, [block: OptimoBlock]>;

  beforeEach(() => {
    handleCustomEmbedSpy = jest.spyOn(handleCustomEmbed, 'default');
  });

  it('map over blocks and call the mapping function multiple times', () => {
    handlePostBlocks(postFixture);
    expect(handleCustomEmbedSpy).toHaveBeenCalledTimes(6);
  });
});
