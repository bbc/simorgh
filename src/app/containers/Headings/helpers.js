const regexPunctuationSymbols = /[^a-z0-9\s-]/gi;
const regexSpaces = /\s+/g;

const createId = (type, text) => {
  if (text && type === 'subheadline') {
    return text.replace(regexPunctuationSymbols, '').replace(regexSpaces, '-');
  }
  return null;
};

export default createId;
