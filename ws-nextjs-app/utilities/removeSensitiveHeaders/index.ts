import { IncomingHttpHeaders } from 'http';

export default function removeSensitiveHeaders(headers?: IncomingHttpHeaders) {
  if (!headers) return {};

  const sensitiveHeaders = process.env.SENSITIVE_HTTP_HEADERS;
  const sensitiveHeadersArray = sensitiveHeaders
    ?.split(',')
    ?.map(el => el.trim());

  const headersCopy = { ...headers };

  sensitiveHeadersArray?.forEach(header => {
    if (headersCopy[header]) {
      delete headersCopy[header];
    }
  });

  return headersCopy;
}
