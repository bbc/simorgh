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
    const serviceName = configFileName.split('.')[0];
    const serviceTestFile = `${dir}/${serviceName}.test.js`;

    if (excludes.indexOf(serviceName) >= 0) {
      return null;
    }

    const importConfig = `import { service } from './${serviceName}';\n`;
    const testTemplate = fs.readFileSync(
      'scripts/linkeyTest.js',
      (error, data) => {
        return data;
      },
    );

    return fs.writeFile(
      serviceTestFile,
      importConfig + testTemplate,
      'utf8',
      error => {
        if (error) throw error;
      },
    );
  });
});
