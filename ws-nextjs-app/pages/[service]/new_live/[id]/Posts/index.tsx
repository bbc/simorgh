import React from 'react';
import path from 'ramda/src/path';

// const PostContent = ({ postContentBlock }: any) => {
//   const postContent = getPostContent(postContentBlock);
// };

export const getPostResults = path(['data', 'results']);

const getHeaderBlocks = path(['header', 'model', 'blocks']);

const getContentBlocks = path(['content', 'model', 'blocks']);

const getContent = path(['model', 'text']);

const getHeadlineOrSubheadline = path([
  'model',
  'blocks',
  0,
  'model',
  'blocks',
  0,
  'model',
  'text',
]);

const PostItem = ({ postItem }: any) => {
  const headerBlocks: any = getHeaderBlocks(postItem);

  const headlineBlocks: any = headerBlocks.filter(
    block => block.type === 'headline',
  );

  const extractHeadline = headlineBlocks.map(item =>
    getHeadlineOrSubheadline(item),
  );

  const subheadlineBlocks: any = headerBlocks.filter(
    block => block.type === 'subheadline',
  );

  const extractSubheadline = subheadlineBlocks.map((item: any) =>
    getHeadlineOrSubheadline(item),
  );

  const contentBlocks: any = getContentBlocks(postItem);

  const paragraphBlocks: any = contentBlocks.filter(
    block => block.type === 'paragraph',
  );

  const extractParagraphContent = paragraphBlocks.map((item: any) =>
    getContent(item),
  );

  return (
    <li>
      <h1>{extractHeadline}</h1>
      <h2>{extractSubheadline}</h2>
      <p>{extractParagraphContent}</p>
    </li>
  );
};

const PostsList = ({ postsData }: any) => {
  const postResults: any = getPostResults(postsData);

  if (!postResults) return null;

  return (
    <ul>
      {postResults.map(item => (
        <PostItem postItem={item} />
      ))}
    </ul>
  );
};

export default PostsList;
