// TODO this is shamelessly borrowed from https://github.com/bbc/simorgh/pull/1701
// Hopefully that will get placed somewhere shared and this file can be replaced with that.

// eslint-disable-next-line no-useless-escape
const regexPunctuationSymbols = /[\[\]\.,\/#?¿!$'"%^&*;:{}=\-_`~()؟؛٬«»！，。？、@#￥……（）：；《）《》“”〔〕’|]/gi;
const regexSpaces = /\s+/g;

// eslint-disable-next-line import/prefer-default-export
export const sanitise = text =>
  text
    .replace(regexPunctuationSymbols, '')
    .replace(regexSpaces, '-')
    .toLowerCase();
