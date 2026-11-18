import { Recommendation } from '#app/models/types/onwardJourney';
import { OptimoBlock } from '#app/models/types/optimo';
import { Environments } from '#app/models/types/global';
import fixtures from './fixtures';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isRecommendation = (value: unknown): value is Recommendation =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.title === 'string' &&
  value.title.trim().length > 0 &&
  typeof value.href === 'string' &&
  isRecord(value.image) &&
  typeof value.image.width === 'number' &&
  value.image.width > 0 &&
  typeof value.image.height === 'number' &&
  value.image.height > 0 &&
  typeof value.image.altText === 'string' &&
  typeof value.image.copyrightHolder === 'string' &&
  typeof value.image.originCode === 'string' &&
  typeof value.image.locator === 'string' &&
  value.image.locator.length > 0;

const isMundoArticleUrl = (href: string) =>
  /^(?:https:\/\/www(?:\.test)?\.bbc\.(?:com|co\.uk))?\/mundo\/articles\/c[a-z0-9]+o(?:[?#].*)?$/.test(
    href,
  );

export const getPrototypeHref = (href: string, search: string) => {
  const url = new URL(href, 'https://www.bbc.com');
  const rendererEnv =
    url.searchParams.get('renderer_env') ||
    new URLSearchParams(search).get('renderer_env');

  if (
    rendererEnv === 'live' ||
    rendererEnv === 'test' ||
    rendererEnv === 'local'
  ) {
    url.searchParams.set('renderer_env', rendererEnv);
  } else if (/^https:\/\/www\.bbc\.(com|co\.uk)\//.test(href)) {
    url.searchParams.set('renderer_env', 'live');
  }

  return `${url.pathname}${url.search}${url.hash}`;
};

export const getRecommendations = ({
  blocks,
  currentArticleId,
  environment,
}: {
  blocks: OptimoBlock[];
  currentArticleId: string;
  environment: Environments;
}): Recommendation[] => {
  const candidates = blocks.flatMap(block =>
    block.type === 'wsoj' &&
    'data' in block.model &&
    Array.isArray(block.model.data)
      ? block.model.data
      : [],
  );

  const selectArticles = (items: unknown[]) =>
    items.filter(isRecommendation).filter((item, index, articles) => {
      if (!isMundoArticleUrl(item.href)) return false;
      const { pathname } = new URL(item.href, 'https://www.bbc.com');
      const articleId = pathname.split('/').pop();

      return (
        articleId !== currentArticleId.split(':').pop() &&
        articles.findIndex(
          article =>
            isMundoArticleUrl(article.href) &&
            new URL(article.href, 'https://www.bbc.com').pathname === pathname,
        ) === index
      );
    });

  const recommendations = selectArticles(candidates);
  if (recommendations.length) return recommendations;

  return selectArticles(fixtures).map(article => ({
    ...article,
    href: `${article.href}?renderer_env=${environment === 'test' ? 'live' : 'local'}`,
  }));
};
