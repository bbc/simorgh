/* eslint-disable no-console */
import { JSDOM } from 'jsdom';

const getManifestFile = async url => {
  const response = await fetch(url);

  const html = await response.text();

  const {
    window: { document },
  } = new JSDOM(html);

  return document.querySelector('link[rel="manifest"]').getAttribute('href');
};

export default async () => {
  const worldServiceUrls = [
    '/portuguese/articles/cqj1e51p7vko.amp',
    '/afrique/articles/c3vynyl4n73o.amp',
    '/japanese/articles/cn4d0275848o.amp',
    '/magyarul/articles/cde4lnjr2e2o.amp',
    '/burmese/articles/c4gyd17q651o.amp',
  ];

  const testResults = await Promise.all(
    worldServiceUrls.map(async url => {
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
