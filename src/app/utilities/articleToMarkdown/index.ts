import { Article, OptimoBylineBlock } from '#app/models/types/optimo';
import extractPromoImage from '#app/lib/utilities/extractPromoImage';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import blocksToMarkdown, { getBlockText } from '../blocksToMarkdown';

export default function articleToMarkdown({
  article,
  canonicalUrl,
}: {
  article: Pick<Article, 'content' | 'promo'> & {
    metadata: Pick<
      Article['metadata'],
      'firstPublished' | 'lastPublished' | 'language'
    >;
  };
  canonicalUrl: string;
}): string {
  const { summary } = article.promo;
  const description =
    typeof summary === 'string'
      ? summary
      : summary?.blocks.map(getBlockText).join('\n\n');
  const bylines = article.content.model.blocks.filter(
    (block): block is OptimoBylineBlock =>
      block.type === 'byline' || block.type === 'subByline',
  );
  const authors = bylines
    .flatMap(block => block.model.blocks)
    .flatMap(contributor =>
      contributor.model.blocks
        .filter(block => block.type === 'name')
        .map(block => getBlockText(block).trim()),
    )
    .filter(Boolean);
  const { rawBlock } = extractPromoImage(
    article.promo.images?.defaultPromoImage?.blocks ?? [],
  );
  const image = rawBlock?.model.locator
    ? buildIChefURL({ ...rawBlock.model, resolution: 800 })
    : undefined;
  const metadata = {
    title: article.promo.headlines.seoHeadline,
    description,
    canonical: canonicalUrl,
    ...(authors.length && { authors: [...new Set(authors)] }),
    'article:published_time': new Date(
      article.metadata.firstPublished,
    ).toISOString(),
    'article:modified_time': new Date(
      article.metadata.lastPublished,
    ).toISOString(),
    language: article.metadata.language,
    image,
  };
  const frontMatter = Object.entries(metadata)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join('\n');

  return `---\n${frontMatter}\n---\n\n${blocksToMarkdown(article.content.model.blocks)}`;
}
