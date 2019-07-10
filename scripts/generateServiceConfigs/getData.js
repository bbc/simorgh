var fs = require('fs');
const YAML = require('yaml')

module.exports = (filename) => {
    var contents = fs.readFileSync(filename,  { encoding: 'utf8' });
    return filename.endsWith('yaml') ? YAML.parse(contents) : contents;
}
