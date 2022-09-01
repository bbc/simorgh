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
}

const loadTheme = /* #__LOADABLE__ */ (props: Props) =>
  import(`./themes/${props.service}`);

const ThemeProvider: LoadableComponent<Props> = loadable(loadTheme);

export default ThemeProvider;
