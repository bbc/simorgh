import { CollapsibleNavigationSection } from './types';

const CollapsibleNavigationSections: CollapsibleNavigationSection[] = [
  {
    id: 'home',
    title: 'Home',
    href: '/ws/languages',
  },
  {
    id: 'africa',
    title: 'Africa',
    links: [
      {
        id: 'afaanoromoo',
        href: 'https://www.bbc.com/afaanoromoo',
        label: 'Oduu Afaan Oromootiin',
      },
      { id: 'amharic', href: 'https://www.bbc.com/amharic', label: 'ዜና በአማርኛ' },
      {
        id: 'afrique',
        href: 'https://www.bbc.com/afrique',
        label: "L'actualité en français",
      },
      {
        id: 'hausa',
        href: 'https://www.bbc.com/hausa',
        label: 'Labarai da Hausa',
      },
      { id: 'igbo', href: 'https://www.bbc.com/igbo', label: 'Akụkọ n’Igbo' },
      {
        id: 'gahuza',
        href: 'https://www.bbc.com/gahuza',
        label: 'Amakuru mu Kinyarwanda/ Kirundi',
      },
      {
        id: 'pidgin',
        href: 'https://www.bbc.com/pidgin',
        label: 'News in Pidgin',
      },
      {
        id: 'somali',
        href: 'https://www.bbc.com/somali',
        label: 'War Af Soomaali ah',
      },
      {
        id: 'swahili',
        href: 'https://www.bbc.com/swahili',
        label: 'Habari kwa Kiswahili',
      },
      {
        id: 'tigrinya',
        href: 'https://www.bbc.com/tigrinya',
        label: 'ዜና ብትግርኛ',
      },
      {
        id: 'yoruba',
        href: 'https://www.bbc.com/yoruba',
        label: 'Ìròyìn ní Yorùbá',
      },
    ],
  },
  {
    id: 'asia-central',
    title: 'Asia Central',
    links: [
      {
        id: 'kyrgyz',
        href: 'https://www.bbc.com/kyrgyz',
        label: 'Кыргыз тилиндеги жаңылыктар',
      },
      {
        id: 'uzbek',
        href: 'https://www.bbc.com/uzbek',
        label: 'Ўзбек тилидаги янгиликлар',
      },
    ],
  },
  {
    id: 'asia-pacific',
    title: 'Asia Pacific',
    links: [
      {
        id: 'burmese',
        href: 'https://www.bbc.com/burmese',
        label: 'မြန်မာသတင်းများ',
      },
      {
        id: 'zhongwen',
        href: 'https://www.bbc.com/zhongwen/simp',
        label: '中文新闻',
      },
      {
        id: 'indonesia',
        href: 'https://www.bbc.com/indonesia',
        label: 'Berita Indonesia',
      },
      {
        id: 'japanese',
        href: 'https://www.bbc.com/japanese',
        label: '日本語ニュース',
      },
      { id: 'korean', href: 'https://www.bbc.com/korean', label: '한국어' },
      { id: 'thai', href: 'https://www.bbc.com/thai', label: 'ข่าวภาษาไทย' },
      {
        id: 'vietnamese',
        href: 'https://www.bbc.com/vietnamese',
        label: 'Tin Tiếng Việt',
      },
    ],
  },
  {
    id: 'asia-south',
    title: 'Asia South',
    links: [
      {
        id: 'bengali',
        href: 'https://www.bbc.com/bengali',
        label: 'বাংলা খবর',
      },
      {
        id: 'gujarati',
        href: 'https://www.bbc.com/gujarati',
        label: 'ગુજરાતીમાં સમાચાર',
      },
      {
        id: 'hindi',
        href: 'https://www.bbc.com/hindi',
        label: 'हिन्दी समाचार',
      },
      {
        id: 'marathi',
        href: 'https://www.bbc.com/marathi',
        label: 'मराठीत बातम्या',
      },
      {
        id: 'nepali',
        href: 'https://www.bbc.com/nepali',
        label: 'नेपाली समाचार',
      },
      {
        id: 'pashto',
        href: 'https://www.bbc.com/pashto',
        label: 'پښتو نړیوال خپرونه',
      },
      {
        id: 'punjabi',
        href: 'https://www.bbc.com/punjabi',
        label: 'ਪੰਜਾਬੀ ਖ਼ਬਰਾਂ',
      },
      {
        id: 'sinhala',
        href: 'https://www.bbc.com/sinhala',
        label: 'සිංහල පුවත්',
      },
      {
        id: 'tamil',
        href: 'https://www.bbc.com/tamil',
        label: 'தமிழில் செய்திகள்',
      },
      {
        id: 'telugu',
        href: 'https://www.bbc.com/telugu',
        label: 'తెలుగు వార్తలు',
      },
      { id: 'urdu', href: 'https://www.bbc.com/urdu', label: 'ردو میں خبریں' },
    ],
  },
  {
    id: 'europe',
    title: 'Europe',
    links: [
      {
        id: 'azeri',
        href: 'https://www.bbc.com/azeri',
        label: 'Azərbaycanca xəbərlər',
      },
      {
        id: 'news',
        href: 'https://www.bbc.co.uk/news',
        label: 'News in English',
      },
      {
        id: 'naidheachdan',
        href: 'https://www.bbc.co.uk/naidheachdan',
        label: 'Naidheachdan',
      },
      {
        id: 'polska',
        href: 'https://www.bbc.com/polska',
        label: 'BBC News po polsku',
      },
      {
        id: 'russian',
        href: 'https://www.bbc.com/russian',
        label: 'Новости на русском языке',
      },
      {
        id: 'serbian',
        href: 'https://www.bbc.com/serbian',
        label: 'BBC News na srpskom',
      },
      {
        id: 'turkce',
        href: 'https://www.bbc.com/turkce',
        label: 'Türkçe Haberler',
      },
      {
        id: 'ukrainian',
        href: 'https://www.bbc.com/ukrainian',
        label: 'Новини українською мовою',
      },
      {
        id: 'cymrufyw',
        href: 'https://www.bbc.co.uk/cymrufyw',
        label: 'Newyddion',
      },
    ],
  },
  {
    id: 'latin-america',
    title: 'Latin America',
    links: [
      {
        id: 'portuguese',
        href: 'https://www.bbc.com/portuguese',
        label: 'Notícias em Português',
      },
      {
        id: 'mundo',
        href: 'https://www.bbc.com/mundo',
        label: 'Noticias para hispanoparlantes',
      },
    ],
  },
  {
    id: 'middle-east',
    title: 'Middle East',
    links: [
      {
        id: 'arabic',
        href: 'http://www.bbc.com/arabic',
        label: 'أخبار باللغة العربية',
      },
      {
        id: 'persian',
        href: 'http://www.bbc.com/persian',
        label: 'خبرها به فارسی',
      },
    ],
  },
];

export default CollapsibleNavigationSections;
