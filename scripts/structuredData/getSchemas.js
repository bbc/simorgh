/* eslint-disable consistent-return */
const getSchemaForMediaFormat = format =>
  format === 'video' ? 'VideoObject' : 'AudioObject';

const getMediaSchemaForMAP = jsonData =>
  getSchemaForMediaFormat(jsonData.promo.media.format);

const getMediaSchemasForSTY = jsonData => {
  if (jsonData.metadata.blockTypes.includes('media')) {
    const { blocks } = jsonData.content;

    const mediaFormats = blocks
      .filter(block => block.type === 'media')
      .map(mediaBlock => mediaBlock.format)
      .map(format => getSchemaForMediaFormat(format));
    return [...new Set(mediaFormats)].sort();
  }
};

const getSchemas = jsonData => {
  const pageType = jsonData.metadata.type;

  switch (pageType) {
    case 'MAP':
      return ['Article', getMediaSchemaForMAP(jsonData)];
    case 'STY': {
      const storySchemas = ['ReportageNewsArticle'];
      const mediaSchemas = getMediaSchemasForSTY(jsonData);
      if (mediaSchemas) {
        storySchemas.push(...mediaSchemas);
      }
      return storySchemas;
    }
    case 'PGL':
      return ['Article'];
    case 'WS-LIVE': // Live Radio
      return ['RadioChannel'];
    case 'IDX':
      return ['WebPage'];
    case 'article':
      return ['Article'];
    case 'WSRADIO': // On Demand Radio
      return []; // TODO: Should be ['AudioObject'] once metadata available
    default:
      return [];
  }
};

module.exports = getSchemas;
