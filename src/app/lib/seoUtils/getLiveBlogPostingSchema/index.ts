import buildIChefURL from '#app/lib/utilities/ichefURL';
import type { OptimoBlock, OptimoImageBlock } from '#app/models/types/optimo';
import type {
  Post,
  PostHeadline,
  PostContributor,
} from '#nextjs/pages/[service]/live/[id]/Post/types';

type ParagraphBlock = OptimoBlock & { model: { text: string } };

const getHeadlineText = (post: Post): string | undefined => {
  const headerBlocks = post?.header?.model?.blocks;
  const headlineBlock = headerBlocks?.find(
    block => block.type === 'headline',
  ) as PostHeadline | undefined;
  return headlineBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;
};

const getArticleBody = (post: Post): string | undefined => {
  const contentBlocks = post?.content?.model?.blocks;
  const paragraphBlocks = contentBlocks?.filter(
    block => block.type === 'paragraph',
  ) as ParagraphBlock[] | undefined;
  if (!paragraphBlocks?.length) return undefined;
  const text = paragraphBlocks?.map(block => block.model.text).join(' ');
  return text || undefined;
};

const getAuthor = (post: Post, orgAuthor: Record<string, unknown>) => {
  const headerBlocks = post?.header?.model?.blocks;
  const contributorBlock = headerBlocks?.find(
    block => block.type === 'contributor',
  ) as PostContributor | undefined;
  if (!contributorBlock) return orgAuthor;
  const { name, link } = contributorBlock.model;
  if (!name) return orgAuthor;
  return { '@type': 'Person', name, ...(link && { url: link }) };
};

const getImage = (post: Post): string | undefined => {
  const contentBlocks = post?.content?.model?.blocks;
  const imageBlock = contentBlocks?.find(block => block.type === 'image') as
    | OptimoImageBlock
    | undefined;
  if (!imageBlock) return undefined;

  const [rawImage] = imageBlock.model.blocks;

  const { locator, originCode } = rawImage?.model ?? {};
  if (!locator || !originCode) return undefined;

  return buildIChefURL({
    locator,
    originCode,
    resolution: 640,
  });
};

const buildUpdatesFromPosts = ({
  posts,
  pageHeadline,
  publisher,
  url,
}: {
  posts: Post[];
  pageHeadline?: string;
  publisher: Record<string, unknown>;
  url: string;
}) =>
  posts
    .map(post => {
      if (!post.urn || !post.dates?.firstPublished) return null;
      const headline = getHeadlineText(post) ?? pageHeadline;
      if (!headline) return null;
      const articleBody = getArticleBody(post);
      const image = getImage(post);
      return {
        '@type': 'BlogPosting',
        '@id': `${url}#post-${post.urn}`,
        isAccessibleForFree: true,
        headline,
        ...(articleBody && { articleBody }),
        author: getAuthor(post, publisher),
        publisher,
        mainEntityOfPage: { '@id': url },
        ...(image && { image }),
        datePublished: post.dates.firstPublished,
        ...(post.dates.lastPublished && {
          dateModified: post.dates.lastPublished,
        }),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort(
      (postA, postB) =>
        new Date(postB.datePublished).getTime() -
        new Date(postA.datePublished).getTime(),
    );

export default ({
  posts,
  brandName,
  defaultImage,
  url,
  pageHeadline,
  description,
  publisherUrl,
  publishingPrinciples,
  startDateTime,
  endDateTime,
}: {
  posts?: Post[];
  brandName: string;
  defaultImage: string;
  url: string;
  pageHeadline?: string;
  description?: string;
  publisherUrl?: string;
  publishingPrinciples?: string;
  startDateTime?: string;
  endDateTime?: string;
}) => {
  const hasPosts = !!posts?.length;
  if (!hasPosts && !startDateTime && !endDateTime) return null;

  const publisher = {
    '@type': 'NewsMediaOrganization',
    name: brandName,
    ...(publisherUrl && { url: publisherUrl }),
    ...(publishingPrinciples && { publishingPrinciples }),
    logo: {
      '@type': 'ImageObject',
      url: defaultImage,
    },
  };

  const liveBlogUpdate = hasPosts
    ? buildUpdatesFromPosts({ posts, pageHeadline, publisher, url })
    : [];

  const coverageStartTime =
    startDateTime ?? liveBlogUpdate.at(-1)?.datePublished;
  const coverageEndTime =
    endDateTime ??
    liveBlogUpdate[0]?.dateModified ??
    liveBlogUpdate[0]?.datePublished;

  const liveBlogPosting = {
    '@type': 'LiveBlogPosting',
    '@id': `${url}#liveblog`,
    url,
    isAccessibleForFree: true,
    ...(pageHeadline && { headline: pageHeadline }),
    publisher,
    author: publisher,
    thumbnailUrl: defaultImage,
    image: {
      '@type': 'ImageObject',
      url: defaultImage,
    },
    mainEntityOfPage: { '@id': url },
    liveBlogUpdate,
    ...(coverageStartTime && { coverageStartTime }),
    ...(coverageEndTime && { coverageEndTime }),
    ...(coverageStartTime && { datePublished: coverageStartTime }),
    ...(coverageEndTime && { dateModified: coverageEndTime }),
  };

  const newsArticle = {
    '@type': 'NewsArticle',
    '@id': `${url}#newsarticle`,
    url,
    ...(pageHeadline && { headline: pageHeadline }),
    ...(description && { description }),
    isAccessibleForFree: true,
    publisher,
    author: publisher,
    image: {
      '@type': 'ImageObject',
      url: defaultImage,
    },
    mainEntityOfPage: { '@id': url },
    ...(coverageStartTime && { datePublished: coverageStartTime }),
    ...(coverageEndTime && { dateModified: coverageEndTime }),
  };

  return { liveBlogPosting, newsArticle };
};
