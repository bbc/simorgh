import * as PAGE_TYPES from '../../routes/utils/pageTypes';

export type Environments = 'local' | 'test' | 'live';

export type Platforms = 'amp' | 'canonical' | 'app' | 'lite';

export type Direction = 'rtl' | 'ltr';

export type SocialEmbedProviders =
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'youtube'
  | 'tiktok';

export type PageTypes = (typeof PAGE_TYPES)[keyof typeof PAGE_TYPES];

export type ToggleDefinition = {
  enabled: boolean;
  value?: string | number;
};

export type Toggles =
  | Record<string, ToggleDefinition>
  | { _environment: string };

export type ServerSideExperiment = {
  experimentName: string;
  variation: string;
  enabled: boolean;
  type?: 'experiment' | 'feature';
};

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

export type UzbekService = {
  service: 'uzbek';
  variant: 'default' | 'cyr' | 'lat';
};

export type ServicesWithVariants =
  | SerbianService
  | ChineseService
  | ZhongwenService
  | UkrainianService
  | UzbekService;

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
    | 'dari'
    | 'klingon'
    | 'gahuza'
    | 'gujarati'
    | 'hausa'
    | 'hindi'
    | 'igbo'
    | 'indonesia'
    | 'japanese'
    | 'korean'
    | 'kyrgyz'
    | 'magyarul'
    | 'marathi'
    | 'mundo'
    | 'naidheachdan'
    | 'nepali'
    | 'news'
    | 'newsround'
    | 'pashto'
    | 'persian'
    | 'pidgin'
    | 'polska'
    | 'portuguese'
    | 'punjabi'
    | 'romania'
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
    | 'vietnamese'
    | 'ws'
    | 'yoruba';
  variant: 'default';
};

export type Services =
  | ServicesWithNoVariants['service']
  | ServicesWithVariants['service'];

export type Variants =
  | ServicesWithNoVariants['variant']
  | ServicesWithVariants['variant'];

export type ServicesVariantsProps = {
  service: Services;
  variant?: Variants;
};
