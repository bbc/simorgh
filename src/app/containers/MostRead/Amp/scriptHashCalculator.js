const crypto = require('crypto');

export default function generateCSPHash(script) {
  const hash = crypto.createHash('sha384');
  const data = hash.update(script, 'utf8');
  return `sha384-${data
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')}`;
}
