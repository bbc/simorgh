import { ServerResponse } from 'http';

const NONCE_PATTERN = /'nonce-([^']+)'/;

// The Content-Security-Policy response header set by addCspHeader is the single
// source of truth for whether this request is serving a nonce.
const getNonceFromCspHeader = (res: ServerResponse | undefined) => {
  const cspHeader = res?.getHeader('Content-Security-Policy');

  console.log('📌 CSP Header:', cspHeader);

  if (typeof cspHeader !== 'string') return null;

  return NONCE_PATTERN.exec(cspHeader)?.[1] ?? null;
};

export default getNonceFromCspHeader;
