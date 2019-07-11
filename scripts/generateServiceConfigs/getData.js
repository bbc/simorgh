// This file gets data from a provided file name
// If it is a yaml file, it further parses it into a JS object

var fs = require('fs');
const YAML = require('yaml')

module.exports = (filename, config) => {
    var contents = fs.readFileSync(filename,  { encoding: 'utf8' });

    if (filename.endsWith('yaml') && config.yamlCleaner) {
        contents = config.yamlCleaner(contents);
    }
    
    return filename.endsWith('yaml') ? YAML.parse(contents) : contents;
}
