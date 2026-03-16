import { OptimoBlock } from '#app/models/types/optimo';
import { Post } from '#nextjs/pages/[service]/live/[id]/Post/types';
import addIdsToItems from '../addIdsToItems';

export interface PostContent {
  model: { blocks: OptimoBlock[] };
}

const addIdsTo = (content: PostContent): PostContent =>
  addIdsToItems<PostContent, OptimoBlock>({
    pathToItems: ['model', 'blocks'],
    recursive: true,
  })(content);

export default (post: Post): Post => {
  const header = addIdsTo(post.header);
  const content = addIdsTo(post.content);
  return { ...post, header, content };
};
