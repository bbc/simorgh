// eslint-disable-next-line no-useless-escape
const regexPunctuationSymbols = /[\[\]\.,\/#?¿!$'"%^&*;:{}=\-_`~()؟؛٬«»！，。？、@#￥……（）：；《）《》“”〔〕’|]/gi;
const regexSpaces = /\s+/g;

const idSanitiser = (text) =>
  text.replace(regexPunctuationSymbols, '').replace(regexSpaces, '-');

export default idSanitiser;
