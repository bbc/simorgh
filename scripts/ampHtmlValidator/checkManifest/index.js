// biome-ignore-all lint/suspicious/noConsole: we want this

const getManifestFile = async url => {
  const response = await fetch(url);
  const html = await response.text();

  // 1. Isolate the <link> tag that has rel="manifest"
  const linkTagMatch = html.match(/<link[^>]*rel=["']manifest["'][^>]*>/i);

  if (linkTagMatch) {
    // 2. Extract the href attribute from that specific tag
    const hrefMatch = linkTagMatch[0].match(/href=["']([^"']+)["']/i);
    return hrefMatch ? hrefMatch[1] : null;
  }

  return null;
};

export default async () => {
  const publicServiceUrls = [
    '/news/articles/c0eg99qjynvo.amp',
    '/sport/tennis/articles/cedlgl4lj23o.amp',
    '/newsround/articles/cp8v6lm0ek6o.amp',
    '/cymrufyw/erthyglau/c4ge78ry9dmo.amp',
    '/naidheachdan/sgeulachdan/c3w14wqg1x8o.amp',
  ];

  const testResults = await Promise.all(
    publicServiceUrls.map(async url => {
      const [, service] = url.split('/');
      const liveManifestFile = await getManifestFile(
        `https://www.bbc.co.uk${url}`,
      );

      const localManifestFile = await getManifestFile(
        `http://localhost:7081/${url}`,
      );

      const result = liveManifestFile === localManifestFile ? '✅' : '❌';

      return {
        service,
        url,
        liveManifestFile,
        localManifestFile,
        result,
      };
    }),
  );

  console.table(testResults);

  const failures = testResults.filter(({ result }) => result === '❌');

  if (failures.length > 0) {
    failures.forEach(({ service }) => {
      console.error(
        `⚠️ The live manifest file for ${service} AMP articles does not match the local manifest file. Please update the manifestPath in src/app/lib/config/services/${service}.ts`,
      );
    });
    process.exitCode = 1;
  }
};