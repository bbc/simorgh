export default ({
  headers,
}: {
  headers: { [x: string]: string } | Headers;
}) => {
  const requestHeaders = new Headers(headers);

  let requestServiceChain = requestHeaders.get('req-svc-chain');

  const simorghPlatform = 'SIMORGH';

  if (requestServiceChain) {
    if (!requestServiceChain.endsWith(simorghPlatform)) {
      requestServiceChain = `${requestServiceChain},${simorghPlatform}`;
    }
  } else {
    requestServiceChain = simorghPlatform;
  }

  return requestServiceChain;
};
