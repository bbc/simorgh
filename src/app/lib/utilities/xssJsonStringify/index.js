import xss from 'xss';

function xssJsonStringify(data) {
  return xss(JSON.stringify(data));
}

export default xssJsonStringify;
