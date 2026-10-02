import { IncomingMessage } from 'http';

const NONCE_KEY = Symbol('simorgh.cspNonce');

type RequestWithNonce = IncomingMessage & { [NONCE_KEY]?: string };

export const setRequestNonce = (
  req: IncomingMessage | undefined,
  nonce: string | null,
) => {
  if (!req || !nonce) return;

  (req as RequestWithNonce)[NONCE_KEY] = nonce;
};

export const getRequestNonce = (req: IncomingMessage | undefined) =>
  (req as RequestWithNonce | undefined)?.[NONCE_KEY];
