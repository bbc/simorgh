
const services = {
    afrique: {
        iniName: 'fr'
    },
    afaanoromoo: {
      iniName: 'om',
      overrides: {
        'open_graph.twitter_handle': '@BBCAfrica'
      }
    },
    amharic: {
      iniName: 'am',
      overrides: {
        'open_graph.twitter_handle': '@bbcnewsamharic'
      }
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
      iniName: 'my',
      yamlCleaner: yaml => yaml.replace('ldp_tag_augmentation', 'unused')
    },
    gahuza: {
      iniName: 'rw'
    },
    gujarati: {
      iniName: 'gu',
      overrides: {
        'open_graph.twitter_handle': '@bbcnewsgujarati'
      }
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
      iniName: 'ko',
      overrides: {
        'open_graph.twitter_handle': '@bbcworld'
      }
    },
    kyrgyz: {
      iniName: 'ky'
    },
    marathi: {
      iniName: 'mr',
      overrides: {
        'open_graph.twitter_handle': '@bbcnewsmarathi'
      }
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
      iniName: 'pt',
      overrides: {
        'base.brand': 'BBC News Brasil'
      }
    },
    punjabi: {
      iniName: 'pa',
      overrides: {
        'open_graph.twitter_handle': '@bbcnewspunjabi'
      }
    },
    russian: {
      iniName: 'ru'
    },
    serbian: {
      iniName: 'sr-Latn',
      overrides: {
        'orbit.lang_code': 'sr-Latn',
        'follow_us.networks.{serviceName}.facebook': 'https://www.facebook.com/BBCNewsnasrpskom',
        'open_graph.twitter_handle': '@bbcnasrpskom'
      }
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
      iniName: 'ta'
    },
    telugu: {
      iniName: 'te',
      overrides: {
        'open_graph.twitter_handle': '@bbcnewstelugu'
      }
    },
    thai: {
      iniName: 'th'
    },
    tigrinya: {
      iniName: 'ti',
      overrides: {
        'open_graph.twitter_handle': '@bbcafrica'
      }
    },
    turkce: {
      iniName: 'tr'
    },
    ukchina: {
      iniName: 'zh-Hans',
      overrides: {
        'orbit.lang_code': 'zh-cn',
        'follow_us.networks.{serviceName}.facebook': 'https://www.facebook.com/bbcworldservice/',
      }
    },
    ukrainian: {
      iniName: 'uk'
    },
    urdu: {
      iniName: 'ur'
    },
    uzbek: {
      iniName: 'uz'
    },
    vietnamese: {
      iniName: 'vi'
    },
    yoruba: {
      iniName: 'yo'
    },
    zhongwen: {
        iniName: 'zh-Hans',
        overrides: {
          'orbit.lang_code': 'zh_CN',
          'follow_us.networks.{serviceName}.facebook': 'https://www.facebook.com/bbcworldservice/',
        }
    },
    cymrufyw: {
      iniName: 'cy',
      yamlCleaner: yaml => yaml.replace('ati_analytics', 'unused')
    },
    naidheachdan: {
      iniName: 'gd',
      yamlCleaner: yaml => yaml.replace('ati_analytics', 'unused')
    },
    japanese: {
      iniName: 'ja',
      overrides: {
        'follow_us.networks.{serviceName}.facebook': 'https://www.facebook.com/bbcnewsjapan/',
      }
    },
    news: {
      iniName: 'en-GB'
    }
};


const servicesToSkip = ['igbo', 'news', 'persian', 'pidgin', 'yoruba'];

// Add default configs
for (let [service, config] of Object.entries(services)) {
  if (servicesToSkip.includes(service)) config.skip = true;
  config.serviceName = config.serviceName || service;
  config.script = config.script || 'latin';
  config.dir = config.dir || 'ltr';
}

module.exports = services;