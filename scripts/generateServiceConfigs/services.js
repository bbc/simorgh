
const services = {
    afrique: {
        // file name in responsive-news/vocabs/src/main/BBC/News/Translation
        iniName: 'fr'
    },
    afaanoromoo: {

    },
    amharic: {

    },
    arabic: {

    },
    azeri: {

    },
    bengali: {

    },
    burmese: {

    },
    gahuza: {

    },
    gujarti: {

    },
    hausa: {

    },
    hindi: {

    },
    igbo: {

    },
    indonesia: {

    },
    korean: {

    },
    kyrgyz: {

    },
    marathi: {

    },
    mundo: {

    },
    nepali: {

    },
    pashto: {

    },
    persian: {

    },
    pidgin: {

    },
    portuguese: {

    },
    punjabi: {

    },
    russian: {

    },
    serbian: {

    },
    sinhala: {

    },
    somali: {

    },
    swahili: {

    },
    tamil: {

    },
    telugu: {

    },
    thai: {

    },
    tigrinya: {

    },
    turkce: {

    },
    ukchina: {

    },
    ukranian: {

    },
    urdu: {

    },
    uzbek: {

    },
    viatnamese: {

    },
    yorubu: {

    },
    zhongwen: {
        
    }
};

// Skip everything but afrique for testing
for (let [service, config] of Object.entries(services)) {
    if (service !== 'afrique') config.skip = true;
  }

module.exports = services;