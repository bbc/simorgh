import { OptimoBlock } from '#app/models/types/optimo';
import { Post } from '#nextjs/pages/[service]/live/[id]/Post/types';
import handleCustomEmbed from '../handleCustomEmbed';
import handleEmptyParagraphBlocks from '../handleEmptyParagraphBlocks';
import handleStreamEmbed from '../enrichVivoEmbed';

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
