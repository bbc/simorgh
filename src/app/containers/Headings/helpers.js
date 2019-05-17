// eslint-disable-next-line no-useless-escape
const regexPunctuationSymbols = /[\[\]\.,\/#?¿!$'"%^&*;:{}=\-_`~()؟؛٬«»！，。？、@#￥……（）：；《）《》“”〔〕’|]/gi;
const regexSpaces = /\s+/g;

const sanitiseString = (type, text) => {
  if (text && type === 'subheadline') {
    return text.replace(regexPunctuationSymbols, '').replace(regexSpaces, '-');
  }
  return null;
};

export default sanitiseString;
