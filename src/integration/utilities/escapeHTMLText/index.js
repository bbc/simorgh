export default htmlText => {
  return htmlText
    .replace('<', '&lt;')
    .replace('>', '&gt;')
    .replace(/&(?!amp|gt|lt)/, '&amp;');
};
