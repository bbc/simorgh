export type SocialEmbedProviders =
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'youtube'
  | 'tiktok';

export type PageTypes =
  | 'article'
  | 'frontPage'
  | 'media'
  | 'mostRead'
  | 'mostWatched'
  | 'error'
  | 'IDX'
  | 'FIX'
  | 'MAP'
  | 'STY'
  | 'PGL'
  | 'CSP'
  | 'TOPIC';

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
  | SerbianService['service']
  | ChineseService['service']
  | UkrainianService['service']
  | ZhongwenService['service'];

export type Variants =
  | ServicesWithNoVariants['variant']
  | SerbianService['variant']
  | ChineseService['variant']
  | UkrainianService['variant']
  | ZhongwenService['variant'];
