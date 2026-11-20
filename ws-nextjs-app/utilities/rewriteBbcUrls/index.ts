import { Services } from '#app/models/types/global';
import SERVICES from '#lib/config/services';

const BBC_PAGE_HOSTS = [
  'www.bbc.com',
  'bbc.com',
  'www.bbc.co.uk',
  'bbc.co.uk',
  'www.bbcrussian.com',
  'bbcrussian.com',
];

type RendererEnv = 'test' | 'live';

type Options = { baseUrl: string; rendererEnv: RendererEnv };

const rewriteUrl = (value: string, { baseUrl, rendererEnv }: Options) => {
  try {
    const url = new URL(value);
    const isBbcPage = BBC_PAGE_HOSTS.includes(url.hostname);
    const isWsService = SERVICES.includes(
      url.pathname.split('/')[1] as Services,
    );

    if (!isBbcPage || !isWsService) return value;

    url.searchParams.set('renderer_env', rendererEnv);

    return `${baseUrl}${url.pathname}${url.search}${url.hash}`;
  } catch {
    return value;
  }
};

const rewrite = (node: unknown, options: Options): unknown => {
  if (typeof node === 'string') return rewriteUrl(node, options);
  if (Array.isArray(node)) return node.map(item => rewrite(item, options));
  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [
        key,
        rewrite(value, options),
      ]),
    );
  }
  return node;
};

type Props = {
  data: Record<string, unknown>;
  baseUrl: string;
  rendererEnv?: string | null;
};

export default ({ data, baseUrl, rendererEnv }: Props) => {
  const { metadata, ...rest } = data;
  const options: Options = {
    baseUrl: baseUrl.replace(/\/$/, ''),
    rendererEnv: rendererEnv === 'live' ? 'live' : 'test',
  };

  return {
    ...(rewrite(rest, options) as Record<string, unknown>),
    ...(metadata !== undefined && { metadata }),
  };
};
