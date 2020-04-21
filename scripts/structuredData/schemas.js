/* eslint-disable consistent-return */

const getSchemaForMediaFormat = format =>
  format === 'video' ? 'VideoObject' : 'AudioObject';

const getMediaSchemaForMAP = jsonData =>
  getSchemaForMediaFormat(jsonData.promo.media.format);

const getMediaSchemasForSTY = jsonData => {
  if (jsonData.metadata.blockTypes.includes('media')) {
    // Get all media blocks & get the format for each
    const { blocks } = jsonData.content;

    const mediaFormats = blocks
      .filter(block => block.type === 'media')
      .map(mediaBlock => mediaBlock.format)
      .map(format => getSchemaForMediaFormat(format));
    return mediaFormats.join(',');
  }

  return '';
};

const getSchemas = jsonData => {
  const pageType = jsonData.metadata.type;

  switch (pageType) {
    case 'MAP':
      return ['Article', getMediaSchemaForMAP(jsonData)];
    case 'STY':
      return ['ReportageNewsArticle', getMediaSchemasForSTY(jsonData)];
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
