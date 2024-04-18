import { IncomingHttpHeaders } from 'http';

export default function removeSensitiveHeaders(headers?: IncomingHttpHeaders) {
  if (!headers) return {};

  const sensitiveHeaders = process.env.SENSITIVE_HTTP_HEADERS;
  const sensitiveHeadersArray = sensitiveHeaders
    ?.split(',')
    ?.map(el => el.trim());

  return Object.keys(headers)
    .filter(objKey => !sensitiveHeadersArray?.includes(objKey))
    .reduce<IncomingHttpHeaders>((newObj, key) => {
      return { ...newObj, [key]: headers[key] };
    }, {});
}
