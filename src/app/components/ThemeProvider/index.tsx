import loadable, { LoadableComponent } from '@loadable/component';

interface Props {
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
    | 'serbian'
    | 'sinhala'
    | 'somali'
    | 'sport'
    | 'swahili'
    | 'tamil'
    | 'telugu'
    | 'thai'
    | 'tigrinya'
    | 'turkce'
    | 'ukchina'
    | 'ukrainian'
    | 'urdu'
    | 'uzbek'
    | 'vietnamese'
    | 'yoruba'
    | 'zhongwen';
  variant: null | 'cyr' | 'lat' | 'simp' | 'trad';
}

// This is to support local 404 and 500 pages for services with variants.
// For example, http://localhost:7080/serbian/500 does not include the variant in the path so we must define a default variant.
// NB These routes do not exist on live. They are for dev and testing purposes.
const defaultServiceVariants: { [index: string]: any } = {
  serbian: 'cyr',
  ukchina: 'simp',
  zhongwen: 'simp',
};

const loadTheme = /* #__LOADABLE__ */ (props: Props) =>
  import(
    `./themes/${props.service}${
      props.variant
        ? `/${props.variant}`
        : `/${defaultServiceVariants[props.service]}` || ''
    }`
  );

const ThemeProvider: LoadableComponent<Props> = loadable(loadTheme);

export default ThemeProvider;
