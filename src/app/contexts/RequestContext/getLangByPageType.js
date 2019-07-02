import deepGet from '../../lib/utilities/deepGet';

const getLangByPageType = (data, lang, type) => {
  return type === 'article'
    ? deepGet(['pageData', 'metadata', 'passport', 'language'], data)
    : lang;
};

export default getLangByPageType;
