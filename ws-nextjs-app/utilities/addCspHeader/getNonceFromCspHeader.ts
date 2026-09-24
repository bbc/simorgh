import { ServerResponse } from 'http';

const NONCE_PATTERN = /'nonce-([^']+)'/;

const getNonceFromCspHeader = (res: ServerResponse | undefined) => {
  const cspHeader = res?.getHeader('Content-Security-Policy');

  if (typeof cspHeader !== 'string') return undefined;

  return NONCE_PATTERN.exec(cspHeader)?.[1];
};

export default getNonceFromCspHeader;
