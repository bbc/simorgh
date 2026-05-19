import crypto, { type BinaryToTextEncoding, type Encoding } from 'crypto';

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
  } catch (_err) {
    return undefined;
  }
};

export default generateCSPHash;
