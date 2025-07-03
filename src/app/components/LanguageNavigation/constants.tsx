import React from 'react';

const languageSections = [
  {
    title: 'Home',
    href: 'https://www.bbc.com',
  },
  {
    title: 'Africa',
    links: [
      {
        href: 'https://www.bbc.com/afaanoromoo',
        label: 'Oduu Afaan Oromootiin',
      },
      { href: 'https://www.bbc.com/amharic', label: 'ዜና በአማርኛ' },
      {
        href: 'https://www.bbc.com/afrique',
        label: 'L&#39;actualité en Français',
      },
      { href: 'https://www.bbc.com/hausa', label: 'Labarai da Hausa' },
      { href: 'https://www.bbc.com/igbo', label: 'Akụkọ n’Igbo' },
      {
        href: 'https://www.bbc.com/gahuza',
        label: 'Amakuru mu Kinyarwanda/ Kirundi',
      },
      { href: 'https://www.bbc.com/pidgin', label: 'News in Pidgin' },
      { href: 'https://www.bbc.com/somali', label: 'War Af Soomaali ah' },
      { href: 'https://www.bbc.com/swahili', label: 'Habari kwa Kiswahili' },
      { href: 'https://www.bbc.com/tigrinya', label: 'ዜና ብትግርኛ' },
      { href: 'https://www.bbc.com/yoruba', label: 'Ìròyìn ní Yorùbá' },
    ],
  },
  {
    title: 'Asia Central',
    links: [
      {
        href: 'https://www.bbc.com/kyrgyz',
        label: 'Кыргыз тилиндеги жаңылыктар',
      },
      { href: 'https://www.bbc.com/uzbek', label: 'Ўзбек тилидаги янгиликлар' },
    ],
  },
  {
    title: 'Asia Pacific',
    links: [
      { href: 'https://www.bbc.com/burmese', label: 'မြန်မာသတင်းများ' },
      { href: 'https://www.bbc.com/zhongwen/simp', label: '中文新闻' },
      { href: 'https://www.bbc.com/indonesia', label: 'Berita Indonesia' },
      { href: 'https://www.bbc.com/japanese', label: '日本語ニュース' },
      { href: 'https://www.bbc.com/korean', label: '한국어' },
      { href: 'https://www.bbc.com/thai', label: 'ข่าวภาษาไทย' },
      { href: 'https://www.bbc.com/vietnamese', label: 'Tin Tiếng Việt' },
    ],
  },
  {
    title: 'Asia South',
    links: [
      { href: 'https://www.bbc.com/bengali', label: 'বাংলা খবর' },
      { href: 'https://www.bbc.com/gujarati', label: 'ગુજરાતીમાં સમાચાર' },
      { href: 'https://www.bbc.com/hindi', label: 'हिन्दी समाचार' },
      { href: 'https://www.bbc.com/marathi', label: 'मराठीत बातम्या' },
      { href: 'https://www.bbc.com/nepali', label: 'नेपाली समाचार' },
      { href: 'https://www.bbc.com/pashto', label: 'پښتو نړیوال خپرونه' },
      { href: 'https://www.bbc.com/punjabi', label: 'ਪੰਜਾਬੀ ਖ਼ਬਰਾਂ' },
      { href: 'https://www.bbc.com/sinhala', label: 'සිංහල පුවත්' },
      { href: 'https://www.bbc.com/tamil', label: 'தமிழில் செய்திகள்' },
      { href: 'https://www.bbc.com/telugu', label: 'తెలుగు వార్తలు' },
      { href: 'https://www.bbc.com/urdu', label: 'ردو میں خبریں' },
    ],
  },
  {
    title: 'Europe',
    links: [
      { href: 'https://www.bbc.com/azeri', label: 'Azərbaycanca xəbərlər' },
      { href: 'https://www.bbc.co.uk/news', label: 'News in English' },
      { href: 'https://www.bbc.co.uk/naidheachdan', label: 'Naidheachdan' },
      { href: 'https://www.bbc.com/polska', label: 'BBC News po polsku' },
      {
        href: 'https://www.bbc.com/russian',
        label: 'Новости на русском языке',
      },
      { href: 'https://www.bbc.com/serbian', label: 'BBC News na srpskom' },
      { href: 'https://www.bbc.com/turkce', label: 'Türkçe Haberler' },
      {
        href: 'https://www.bbc.com/ukrainian',
        label: 'Новини українською мовою',
      },
      { href: 'https://www.bbc.co.uk/cymrufyw', label: 'Newyddion' },
    ],
  },
  {
    title: 'Latin America',
    links: [
      {
        href: 'https://www.bbc.com/portuguese',
        label: 'Notícias em Português',
      },
      {
        href: 'https://www.bbc.com/mundo',
        label: 'Noticias para hispanoparlantes',
      },
    ],
  },
  {
    title: 'Middle East',
    links: [
      { href: 'http://www.bbc.com/arabic', label: 'أخبار باللغة العربية' },
      { href: 'http://www.bbc.com/persian', label: 'خبرها به فارسی' },
    ],
  },
];

export default languageSections;

export const CloseIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="12 12 20 20"
    aria-hidden="true"
    width="22"
    height="22"
  >
    <path
      d="M26.741 15L21.6 20.142 16.458 15 15 16.458l5.142 5.142L15 26.742l1.458 1.458 5.142-5.141 5.141 5.141 1.459-1.458-5.142-5.142 5.142-5.142z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
