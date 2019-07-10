
const services = {
    afrique: {
        iniName: 'fr'
    },
    afaanoromoo: {
      iniName: 'om'
    },
    amharic: {
      iniName: 'am'
    },
    arabic: {
      iniName: 'ar'
    },
    azeri: {
      iniName: 'az'
    },
    bengali: {
      iniName: 'bn'
    },
    burmese: {
      iniName: 'my'
    },
    gahuza: {
      iniName: 'rw'
    },
    gujarti: {
      iniName: 'gu'
    },
    hausa: {
      iniName: 'ha'
    },
    hindi: {
      iniName: 'hi'
    },
    igbo: {
      iniName: 'ig'
    },
    indonesia: {
      iniName: 'id'
    },
    korean: {
      iniName: 'ko'
    },
    kyrgyz: {
      iniName: 'ky'
    },
    marathi: {
      iniName: 'mr'
    },
    mundo: {
      iniName: 'es'
    },
    nepali: {
      iniName: 'ne'
    },
    pashto: {
      iniName: 'ps'
    },
    persian: {
      iniName: 'fa'
    },
    pidgin: {
      iniName: 'pcm'
    },
    portuguese: {
      iniName: 'pt'
    },
    punjabi: {
      iniName: 'pa'
    },
    russian: {
      iniName: 'ru'
    },
    serbian: {
      iniName: 'sr'
    },
    sinhala: {
      iniName: 'si'
    },
    somali: {
      iniName: 'so'
    },
    swahili: {
      iniName: 'sw'
    },
    tamil: {
      iniName: 'tamil'
    },
    telugu: {
      iniName: 'te'
    },
    thai: {
      iniName: 'th'
    },
    tigrinya: {
      iniName: 'ti'
    },
    turkce: {
      iniName: 'tr'
    },
    ukchina: {
      iniName: 'zh-Hans'
    },
    ukranian: {
      iniName: 'uk'
    },
    urdu: {
      iniName: 'ur'
    },
    uzbek: {
      iniName: 'uz'
    },
    viatnamese: {
      iniName: 'vi'
    },
    yorubu: {
      iniName: 'yo'
    },
    zhongwen: {
        iniName: 'zh-Hans'
    },
    cymrufyw: {
      iniName: 'cy'
    },
    naidheachdan: {
      iniName: 'gd'
    },
    japanese: {
      iniName: 'ja'
    },
    news: {
      iniName: 'en-GB'
    }
};


const servicesToSkip = ['igbo', 'news', 'persian', 'pidgin', 'yoruba'];

// Add default configs
for (let [service, config] of Object.entries(services)) {
  if (servicesToSkip.includes(service)) config.skip = true;
  config.script = config.script || 'latin';
  config.dir = config.dir || 'ltr';
}

module.exports = services;