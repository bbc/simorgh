import { GetServerSidePropsContext } from 'next';
import services from '#lib/config/services/loadableConfig';
import { Services, Variants } from '#app/models/types/global';

// Key for grouped params from the dynamic route
const QUERY_PARAM_KEY = '';

// Asset ID regexes
const CPS_ID_REGEX = /([0-9]{5,9}|[a-z0-9\-_]+-[0-9]{5,9})$/;
const OPTIMO_ID_REGEX = /^c[a-zA-Z0-9]{10}o$/;
const TIPO_ID_REGEX =
  /^(c[a-zA-Z0-9]{10,11}t)|([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})$/;

const EMBED_ID_REGEX = /p[0-9a-z]{7,}/;

// Language codes
const LANGS = [
  'am',
  'ar',
  'az',
  'bn',
  'cy',
  'en',
  'en-gb',
  'es',
  'fa',
  'fr',
  'gd',
  'gu',
  'ha',
  'hi',
  'id',
  'ig',
  'ja',
  'ko',
  'ky',
  'mr',
  'my',
  'ne',
  'om',
  'pa',
  'pcm',
  'ps',
  'pt',
  'pt-br',
  'ru',
  'ru-uk',
  'ru-ua',
  'rw',
  'si',
  'so',
  'sr-cyrl',
  'sr-latn',
  'sw',
  'ta',
  'te',
  'tg',
  'th',
  'ti',
  'tr',
  'uk',
  'ur',
  'uz',
  'uz-cyrl',
  'vi',
  'yo',
  'zh-hans',
  'zh-hant',
];

const LANGS_REGEX = new RegExp(`^(${LANGS.join('|')})$`);

const SERVICES = Object.keys(services) as Services[];
const VARIANTS = ['lat', 'cyr', 'trad', 'simp'] as Variants[];

type Query = GetServerSidePropsContext['query'];

const extractService = (query?: Query): Services | null => {
  if (!query?.[QUERY_PARAM_KEY]) return null;

  if (query.service !== 'ws') return query.service as Services;

  const queryArray = query?.[QUERY_PARAM_KEY];

  const service = SERVICES.find(s => queryArray.includes(s));

  return service ?? null;
};

const extractVariant = (query?: Query): Variants | null => {
  if (!query?.[QUERY_PARAM_KEY]) return null;

  const queryArray = query?.[QUERY_PARAM_KEY];

  const variant = VARIANTS.find(v => queryArray.includes(v));

  return variant ?? null;
};

const extractDataPlatform = (query?: Query) => {
  if (!query?.[QUERY_PARAM_KEY]) return null;

  const queryArray = query?.[QUERY_PARAM_KEY] as string[];

  const assetId = queryArray.find((id: string) => {
    return (
      CPS_ID_REGEX.test(id) ||
      OPTIMO_ID_REGEX.test(id) ||
      TIPO_ID_REGEX.test(id)
    );
  });

  if (!assetId) return null;

  const isCpsId = CPS_ID_REGEX.test(assetId);
  const isOptimoId = OPTIMO_ID_REGEX.test(assetId);
  const isTopicId = TIPO_ID_REGEX.test(assetId);

  if (isCpsId) return 'cps';
  if (isOptimoId) return 'articles';
  if (isTopicId) return 'live';

  return null;
};

const extractAssetId = (query?: Query) => {
  if (!query?.[QUERY_PARAM_KEY]) return null;

  const queryArray = query?.[QUERY_PARAM_KEY] as string[];

  const assetId = queryArray.find((id: string) => {
    return (
      CPS_ID_REGEX.test(id) ||
      OPTIMO_ID_REGEX.test(id) ||
      TIPO_ID_REGEX.test(id)
    );
  });

  return assetId ?? null;
};

const extractEmbedId = (query?: Query) => {
  if (!query?.[QUERY_PARAM_KEY]) return null;

  const queryArray = query?.[QUERY_PARAM_KEY] as string[];

  const embedId = queryArray.find((id: string) => EMBED_ID_REGEX.test(id));

  return embedId ?? null;
};

const extractLang = (query?: Query) => {
  if (!query?.[QUERY_PARAM_KEY]) return null;

  const queryArray = query?.[QUERY_PARAM_KEY] as string[];

  const lang = queryArray.find((l: string) => LANGS_REGEX.test(l));

  return lang ?? null;
};

export default function parseAvSyndicationRoute(query?: Query) {
  const isSyndicationRoute = query?.service !== 'ws';

  const service = extractService(query);
  const variant = extractVariant(query);
  const dataPlatform = extractDataPlatform(query);
  const assetId = extractAssetId(query);
  const embedId = extractEmbedId(query);
  const lang = extractLang(query);

  const isValidService = service && SERVICES.includes(service);

  const invalidAvRoute = !isValidService || !dataPlatform || !assetId;

  return {
    status: !invalidAvRoute ? 200 : 404,
    data: {
      input: query,
      output: {
        isSyndicationRoute,
        service,
        variant,
        dataPlatform,
        assetId,
        embedId,
        lang,
      },
    },
  };
}
