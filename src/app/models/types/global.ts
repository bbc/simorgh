export type Serbian = {
  service: 'serbian';
  variant: 'cyr' | 'lat';
};

export type Chinese = {
  service: 'ukchina';
  variant: 'simp' | 'trad';
};

export type Zhongwen = {
  service: 'zhongwen';
  variant: 'simp' | 'trad';
};

export type Ukrainian = {
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

export type ServicesAndVariants =
  | ServicesWithNoVariants
  | Serbian
  | Chinese
  | Zhongwen
  | Ukrainian;

export type Services =
  | ServicesWithNoVariants['service']
  | Serbian['service']
  | Chinese['service']
  | Zhongwen['service']
  | Ukrainian['service'];

export type Variants =
  | ServicesWithNoVariants['variant']
  | Serbian['variant']
  | Chinese['variant']
  | Zhongwen['variant']
  | Ukrainian['variant'];
