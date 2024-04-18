import { IncomingHttpHeaders } from 'http';

export default function removeSensitiveHeaders(headers?: IncomingHttpHeaders) {
  if (!headers) return {};

  const sensitiveHeadersArray = process.env.SENSITIVE_HTTP_HEADERS?.split(
    ',',
  )?.map(el => el.trim());

  return Object.keys(headers)
    ?.filter(objKey => !sensitiveHeadersArray?.includes(objKey))
    ?.reduce<IncomingHttpHeaders>((newObj, key) => {
      return { ...newObj, [key]: headers[key] };
    }, {});
}
