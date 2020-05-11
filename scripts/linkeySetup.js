const fs = require('fs');

const dir = 'src/app/lib/config/services';
const excludes = [
  'archive',
  'cymrufyw',
  'loadableConfig',
  'naidheachdan',
  'scotland',
  'serbian', // service with variant
  'ukchina', // service with variant
  'zhongwen', // service with variant
];

fs.readdir(dir, (err, files) => {
  if (err) {
    return err;
  }

  return files.forEach(configFileName => {
    const noExtension = configFileName.split('.');
    const fileName = `${dir}/${noExtension[0]}.test.js`;

    // TO DO: footer links
    // TO DO: services with variants
    // TO DO: what if no navigation/footer links available
    const importConfig = `import { service } from '#lib/config/services/${noExtension[0]}';\n`;
    const testFile = fs.readFileSync('scripts/linkeyTest.js', (error, data) => {
      return data;
    });

    if (excludes.indexOf(noExtension[0]) > 0) {
      return null;
    }

    return fs.writeFile(fileName, importConfig + testFile, 'utf8', error => {
      if (error) throw error;
    });
  });
});
