// prettier-ignore
/* eslint-disable-next-line no-useless-escape */
export const regexPunctuationSymbols = /[\[\]\.,\/?¿!$'"%^&*;:{}=\-_`~()؟؛٬«»！，。？、@#￥…（：；）《》“”〔〕’|]/;
const regexPunctuationSymbolsGI = new RegExp(regexPunctuationSymbols, 'gi');
const regexSpaces = /\s+/g;

const idSanitiser = text =>
  text.replace(regexPunctuationSymbolsGI, '').replace(regexSpaces, '-');
export default idSanitiser;
