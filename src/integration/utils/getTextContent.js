module.exports = el =>
  el.textContent.replace(/[.@]([a-z].*?)}/g, '').replace(/}/g, '');
