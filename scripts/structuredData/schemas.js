/* eslint-disable consistent-return */
/* eslint-disable default-case */

const getSchemaForMedia = jsonData => {
  return jsonData.promo.media.format === 'video'
    ? 'VideoObject'
    : 'AudioObject';
};

const getSchemas = jsonData => {
  const pageType = jsonData.metadata.type;

  switch (pageType) {
    case 'MAP':
      return ['Article', getSchemaForMedia(jsonData)];
    case 'PGL':
      return ['Article'];
    case 'WS-LIVE': // Live Radio
      return ['RadioChannel'];
    case 'IDX':
      return ['WebPage'];
    case 'article':
      return ['Article'];
    case 'WSRADIO': // On Demand Radio
      return [];
    default:
      return [];
  }
};

module.exports = getSchemas;
