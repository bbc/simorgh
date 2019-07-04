import deepGet from '../../lib/utilities/deepGet';

const getLangByPageType = (data, defaultLang, pageType) => {
  return pageType === 'article'
    ? deepGet(['pageData', 'metadata', 'passport', 'language'], data)
    : defaultLang;
};

export default getLangByPageType;
