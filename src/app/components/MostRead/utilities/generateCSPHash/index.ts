import crypto, { BinaryToTextEncoding, Encoding } from 'crypto';

interface GenerateCSPHashProps {
  script: string;
  sha: string;
  encoding: Encoding;
  base: BinaryToTextEncoding;
}

const generateCSPHash = ({
  script,
  sha,
  encoding,
  base,
}: GenerateCSPHashProps) => {
  try {
    const hash = crypto.createHash(sha);
    const data = hash.update(script, encoding);
    return `${sha}-${data
      .digest(base)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')}`;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      `Failed to create hash with params script = ${script}, 
      sha = ${sha}, 
      encoding = ${encoding}, 
      base = ${base}`,
    );
    return undefined;
  }
};

export default generateCSPHash;
