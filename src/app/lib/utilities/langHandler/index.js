const serviceLangMap = {
  ru: 'ru-UA',
};

/**
 * Returns the name of a service lang override for a given page lang.
 * @param {string} pageLang A page lang - as provided by pageData.
 */
const getLangOverride = pageLang => serviceLangMap[pageLang];

export default getLangOverride;
