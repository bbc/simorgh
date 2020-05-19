const fs = require('fs');

const dir = 'src/app/lib/config/services';
const excludes = [
  'archive',
  'cymrufyw',
  'loadableConfig',
  'naidheachdan',
  'scotland',
];

fs.readdir(dir, (err, files) => {
  if (err) {
    return err;
  }

  return files.forEach(configFileName => {
    const fileName = configFileName.split('.');

    const importConfig = `import { service } from './${fileName[0]}';\n`;
    const testFile = fs.readFileSync('scripts/linkeyTest.js', (error, data) => {
      return data;
    });

    if (excludes.indexOf(fileName[0]) >= 0) {
      return null;
    }

    return fs.writeFile(
      `${dir}/${fileName[0]}.test.js`,
      importConfig + testFile,
      'utf8',
      error => {
        if (error) throw error;
      },
    );
  });
});
