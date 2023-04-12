export type Environments = 'local' | 'test' | 'live';

export type Platforms = 'amp' | 'canonical';

export type SocialEmbedProviders =
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'youtube'
  | 'tiktok';

export type PageTypes =
  | 'article'
  | 'mediaArticle'
  | 'frontPage'
  | 'media'
  | 'mostRead'
  | 'mostWatched'
  | 'error'
  | 'IDX'
  | 'FIX'
  | 'MAP' // CPS MAP page
  | 'STY'
  | 'PGL'
  | 'CSP'
  | 'TOPIC'
  | 'home';

export type SerbianService = {
  service: 'serbian';
  variant: 'cyr' | 'lat';
};

export type ChineseService = {
  service: 'ukchina';
  variant: 'simp' | 'trad';
};

export type ZhongwenService = {
  service: 'zhongwen';
  variant: 'simp' | 'trad';
};

export type UkrainianService = {
  service: 'ukrainian';
  variant: 'default' | 'ru-UA';
};

export type ServicesWithVariants =
  | SerbianService
  | ChineseService
  | ZhongwenService
  | UkrainianService;

export type ServicesWithNoVariants = {
  service:
    | 'afaanoromoo'
    | 'afrique'
    | 'amharic'
    | 'arabic'
    | 'archive'
    | 'azeri'
    | 'bengali'
    | 'burmese'
    | 'cymrufyw'
    | 'gahuza'
    | 'gujarati'
    | 'hausa'
    | 'hindi'
    | 'igbo'
    | 'indonesia'
    | 'japanese'
    | 'korean'
    | 'kyrgyz'
    | 'marathi'
    | 'mundo'
    | 'naidheachdan'
    | 'nepali'
    | 'news'
    | 'newsround'
    | 'pashto'
    | 'persian'
    | 'pidgin'
    | 'portuguese'
    | 'punjabi'
    | 'russian'
    | 'scotland'
    | 'sport'
    | 'sinhala'
    | 'somali'
    | 'swahili'
    | 'tamil'
    | 'telugu'
    | 'thai'
    | 'tigrinya'
    | 'turkce'
    | 'urdu'
    | 'uzbek'
    | 'vietnamese'
    | 'yoruba';
  variant: 'default';
};

export type Services =
  | ServicesWithNoVariants['service']
  | ServicesWithVariants['service'];

export type Variants =
  | ServicesWithNoVariants['variant']
  | ServicesWithVariants['variant'];
