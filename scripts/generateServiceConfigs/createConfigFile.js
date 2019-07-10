var fs = require('fs');
const get = require('lodash/get');

const getIniReplacement = ini => (_, token) => {
    console.log('ini replacement', token);
    return 'TODO';
}

module.exports = (serviceName, serviceConfig, yaml, ini) => {
    let fileContents = fs.readFileSync('./serviceTemplate.js',  { encoding: 'utf8' });

    // Find and replace YAML tokens
    fileContents = fileContents.replace(/{yaml\|(.*)}/g, (_, token) => get(yaml, token));

    // Find and replace INI tokens
    fileContents = fileContents.replace(/{ini\|(.*)}/g, getIniReplacement(ini));

    // Write File
    console.log(fileContents);

    // Return
}