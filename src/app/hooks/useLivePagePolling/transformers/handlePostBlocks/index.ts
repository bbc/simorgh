import type { OptimoBlock } from '#app/models/types/optimo';
import type { Post } from '#nextjs/pages/[service]/live/[id]/Post/types';
import handleStreamEmbed from '../enrichVivoEmbed';
import handleCustomEmbed from '../handleCustomEmbed';
import handleEmptyParagraphBlocks from '../handleEmptyParagraphBlocks';

export default (post: Post): Post => {
  const { blocks } = post.content.model;

  if (Array.isArray(blocks)) {
    // eslint-disable-next-line no-param-reassign
    post.content.model.blocks = handleEmptyParagraphBlocks(
      (blocks as typeof blocks)
        .map(block => handleCustomEmbed(block))
        .map(block => handleStreamEmbed(block)),
    ) as OptimoBlock[];
  }

  return post;
};
