var fs = require('fs');
const YAML = require('yaml')
const ini = require('ini');

module.exports = (filename) => {
    var contents = fs.readFileSync('./responsive-news/config/afrique.yaml',  { encoding: 'utf8' });
    return filename.endsWith('yaml') ? YAML.parse(contents) : ini.parse(contents);
}
