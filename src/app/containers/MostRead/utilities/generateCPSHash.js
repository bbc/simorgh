import crypto from 'crypto';

const generateCSPHash = (script, sha, encoding, base) => {
  try {
    const hash = crypto.createHash(sha);
    const data = hash.update(script, encoding);
    return `${sha}-${data
      .digest(base)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')}`;
  } catch (err) {
    console.log(
      `Failed to create hash with params ${(script, sha, encoding, base)}`,
    );
    return null;
  }
};

export default generateCSPHash;
