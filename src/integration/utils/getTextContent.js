const old = el =>
  el.textContent.replace(/[.@]([a-z].*?)}/g, '').replace(/}/g, '');

const getTextContent = el => {
  if (el.children && el.children.length) {
    return Array.from(el.childNodes)
      .map(node => getTextContent(node))
      .flat()
      .join('');
  }
  if (el.tagName !== 'STYLE') {
    return el.textContent;
  }
  return '';
};

module.exports = getTextContent;
