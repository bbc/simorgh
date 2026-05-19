export const regexPunctuationSymbols =
  /[[\].,/?¿!$'"%^&*;:{}=\-_`~()؟؛٬«»！，。？、@#￥…（：；）《》“”〔〕’|]/;
const regexPunctuationSymbolsGI = new RegExp(regexPunctuationSymbols, 'gi');
const regexSpaces = /\s+/g;

const idSanitiser = text =>
  text.replace(regexPunctuationSymbolsGI, '').replace(regexSpaces, '-');
export default idSanitiser;
