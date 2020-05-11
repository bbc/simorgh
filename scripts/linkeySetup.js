const fs = require('fs');

const dir = 'src/app/lib/config/services';
const excludes = [
  'archive',
  'cymrufyw',
  'loadableConfig',
  'naidheachdan',
  'scotland',
  'serbian', // variant
  'ukchina', // variant
  'zhongwen', // variant
];

fs.readdir(dir, (err, files) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.log(
      `Unable to scan the directory or something else went wrong - ${err}`,
    );
  }

  return files.forEach(configFileName => {
    const noExtension = configFileName.split('.');
    const fileName = `${dir}/${noExtension[0]}.test.js`;
    const contents = `import fetch from 'node-fetch';import { service } from '#lib/config/services/${noExtension[0]}';const fetchResponse = async link => {const fetchStatus = await fetch(link);return fetchStatus.status;};describe(service.default.service + ' links', () => {const { navigation } = service.default;navigation.map(nav => {const fullUrl = 'https://www.bbc.com' + nav.url;return it('should return 200 for ' + fullUrl, async () => {expect(await fetchResponse(fullUrl)).toEqual(200);});});});`;

    if (excludes.indexOf(noExtension[0]) > 0) {
      return 'file excluded';
    }

    return fs.writeFile(fileName, contents, 'utf8', error => {
      if (error) throw error;
    });
  });
});
