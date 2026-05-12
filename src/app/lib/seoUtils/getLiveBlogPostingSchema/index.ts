import buildIChefURL from '#app/lib/utilities/ichefURL';
import { OptimoBlock } from '#app/models/types/optimo';
import { Post } from '#nextjs/pages/[service]/live/[id]/Post/types';

const getHeadlineText = (post: Post): string | undefined => {
  const headerBlocks = post?.header?.model?.blocks;
  const headlineBlock = headerBlocks?.find(block => block.type === 'headline');
  // @ts-expect-error - deeply nested
  return headlineBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;
};

const getArticleBody = (post: Post): string | undefined => {
  const contentBlocks = post?.content?.model?.blocks;
  const paragraphBlocks = contentBlocks?.filter(
    block => block.type === 'paragraph',
  );
  if (!paragraphBlocks?.length) return undefined;
  // @ts-expect-error - deeply nested
  const text = paragraphBlocks.map(block => block.model.text).join(' ');
  return text || undefined;
};

const getAuthor = (post: Post, orgAuthor: Record<string, unknown>) => {
  const headerBlocks = post?.header?.model?.blocks;
  const contributorBlock = headerBlocks?.find(
    block => block.type === 'contributor',
  );

  if (!contributorBlock) return orgAuthor;

  // @ts-expect-error - deeply nested
  const { name, link } = contributorBlock.model ?? {};
  if (!name) return orgAuthor;

  return {
    '@type': 'Person',
    name,
    ...(link && { url: link }),
  };
};

const getImage = (post: Post): string | undefined => {
  const contentBlocks = post?.content?.model?.blocks;
  const imageBlock = contentBlocks?.find(block => block.type === 'image');
  if (!imageBlock) return undefined;

  // @ts-expect-error - deeply nested
  const imageSource = imageBlock?.model?.blocks?.find(
    (block: OptimoBlock) => block.type === 'rawImage',
  );

  const { locator, originCode } = imageSource.model ?? {};
  if (!locator || !originCode) return undefined;

  return buildIChefURL({
    locator,
    originCode,
    resolution: 640,
  });
};

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

  const webPageId = `${url}#webpage`;

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
    ? posts
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
            mainEntityOfPage: { '@id': webPageId },
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
        )
    : [];

  const coverageStartTime =
    startDateTime ?? liveBlogUpdate.at(-1)?.datePublished;
  const coverageEndTime =
    endDateTime ??
    liveBlogUpdate[0]?.dateModified ??
    liveBlogUpdate[0]?.datePublished;

  const liveBlogPostingId = `${url}#liveblog`;

  const webPage = {
    '@type': 'WebPage',
    '@id': webPageId,
    url,
    ...(pageHeadline && { name: pageHeadline }),
    ...(description && { description }),
    publisher,
  };

  const liveBlogPosting = {
    '@type': 'LiveBlogPosting',
    '@id': liveBlogPostingId,
    url,
    isAccessibleForFree: true,
    mainEntityOfPage: { '@id': webPageId },
    liveBlogUpdate,
    ...(coverageStartTime && { coverageStartTime }),
    ...(coverageEndTime && { coverageEndTime }),
  };

  return [webPage, liveBlogPosting] as const;
};
