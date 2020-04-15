/* eslint-disable consistent-return */
/* eslint-disable default-case */
// Article, VideoObject, WebPage, RadioChannel, AudioObject, ReportageNewsArticle

const getSchemaForMedia = (jsonData) => {
  return jsonData.promo.media.format === 'video'
    ? 'VideoObject'
    : 'AudioObject';
};

const getSchemas = (jsonData) => {
  const pageType = jsonData.metadata.type;

  switch (pageType) {
    case 'MAP':
      return ['Article', getSchemaForMedia(jsonData)];
    case 'PGL':
      return ['Article'];
    case 'WS-LIVE':
      return ['RadioChannel'];
    case 'IDX':
      return ['WebPage'];
    case 'article':
      return ['Article'];
    case 'WSRADIO':
      return ['Article, AudioObject'];
  }
};

module.exports = getSchemas;
