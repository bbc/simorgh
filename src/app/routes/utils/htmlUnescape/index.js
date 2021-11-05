// Function taken from https://github.com/sindresorhus/escape-goat as this package is not compiled down to ES5 so does not support IE11
const htmlUnescape = htmlString =>
  htmlString
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&#0?39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');

export default htmlUnescape;
