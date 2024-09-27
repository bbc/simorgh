import services from '#lib/config/services/loadableConfig';
import { Services, Variants } from '#app/models/types/global';

type Query = string[];
type Platform = 'cps' | 'articles' | 'tipo';

// Asset ID regexes
const CPS_ID_REGEX = /([0-9]{5,9}|[a-z0-9\-_]+-[0-9]{5,9})$/;
const OPTIMO_ID_REGEX = /^c[a-zA-Z0-9]{10}o$/;
const TIPO_ID_REGEX =
  /^(c[a-zA-Z0-9]{10,11}t)|([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})$/;

const MEDIA_ID_REGEX = /^((?!portuguese)p[a-z0-9]{7,})$/;

const MEDIA_DELIMITERS = ['vpid', 'pid'];

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
  'uz-latn',
  'vi',
  'yo',
  'zh-hans',
  'zh-hant',
];

const LANGS_REGEX = new RegExp(`^(${LANGS.join('|')})$`);

const SERVICES = Object.keys(services) as Services[];
const VARIANTS = ['lat', 'cyr', 'trad', 'simp'] as Variants[];

const extractService = (query: Query): Services | null => {
  const service = SERVICES.find(s => s !== 'ws' && query?.includes(s));

  return service ?? null;
};

const extractVariant = (query: Query): Variants | null => {
  const variant = VARIANTS.find(v => query?.includes(v));

  return variant ?? null;
};

const extractPlatform = (query: Query): Platform | null => {
  let platform: Platform | null = null;

  // eslint-disable-next-line no-restricted-syntax
  for (const id of query ?? []) {
    if (CPS_ID_REGEX.test(id)) {
      platform = 'cps';
      break;
    }
    if (OPTIMO_ID_REGEX.test(id)) {
      platform = 'articles';
      break;
    }
    if (TIPO_ID_REGEX.test(id)) {
      platform = 'tipo';
      break;
    }
  }

  return platform;
};

const extractAssetId = (query: Query) => {
  const assetId = query?.find((id: string) => {
    return (
      CPS_ID_REGEX.test(id) ||
      OPTIMO_ID_REGEX.test(id) ||
      TIPO_ID_REGEX.test(id)
    );
  });

  return assetId ?? null;
};

const extractMediaId = (query: Query) => {
  const mediaId = query?.find((id: string) => MEDIA_ID_REGEX.test(id));

  return mediaId ?? null;
};

const extractLang = (query: Query) => {
  const lang = query?.find((l: string) => LANGS_REGEX.test(l?.toLowerCase()));

  return lang ?? null;
};

const extractAmp = (query: Query) => {
  const amp = query?.includes('amp');

  return amp ?? null;
};

const extractMediaDelimiter = (query: Query) => {
  const mediaDelimiter = query?.find((id: string) =>
    MEDIA_DELIMITERS.includes(id),
  );

  return mediaDelimiter ?? null;
};

export default function parseAvRoute(resolvedUrl: string) {
  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];

  const query = resolvedUrlWithoutQuery.split(/[/.]/).filter(Boolean);

  const isWsRoute = query.includes('ws');
  const isAmp = extractAmp(query);

  const service = extractService(query);
  const variant = extractVariant(query);
  const platform = extractPlatform(query);
  const assetId = extractAssetId(query);
  const mediaId = extractMediaId(query);
  const mediaDelimiter = extractMediaDelimiter(query);
  const lang = extractLang(query);

  return {
    isWsRoute,
    isAmp,
    service,
    variant,
    platform,
    assetId,
    mediaId,
    mediaDelimiter,
    lang,
  };
}
