// This is to improve readability of snapshots by removing noise (eg, styles)
const getTextContent = el => {
  if (el.children && el.children.length) {
    return Array.from(el.childNodes)
      .map(getTextContent)
      .flat()
      .map(textContent => textContent.trim())
      .filter(Boolean)
      .join(' ');
  }
  if (el.tagName !== 'STYLE') {
    return el.textContent;
  }
  return '';
};
module.exports = getTextContent;
