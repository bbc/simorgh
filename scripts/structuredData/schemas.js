/* eslint-disable consistent-return */
/* eslint-disable default-case */

const getSchemaForMedia = (jsonData) => {
  return jsonData.promo.media.format === 'video'
    ? 'VideoObject'
    : 'AudioObject';
};

const getSchemas = (jsonData) => {
  const pageType = jsonData.metadata.type;

  switch (pageType) {
    case 'MAP':
      return getSchemaForMedia(jsonData);
    case 'PGL':
      return 'Article';
    case 'WS-LIVE':
      return 'RadioChannel';
    case 'IDX':
      return 'WebPage';
    case 'article':
      return 'Article';
    case 'WSRADIO':
      return 'AudioObject';
  }
};

module.exports = getSchemas;
