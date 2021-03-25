const ExternalLinksTextsLang = {
  Spotify: 'en-GB',
  Apple: 'en-GB',
  RSS: 'en-GB',
  Yandex: 'en-GB',
  Castbox: 'en-GB',
};

const getExternalLinkLang = ({ podcastService, serviceLang }) => {
  return ExternalLinksTextsLang[podcastService] || serviceLang;
};

export default getExternalLinkLang;
