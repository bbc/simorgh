var fs = require('fs');
const get = require('lodash/get');

const FILE_PATH = './generatedConfigs';

const getIniReplacement = ini => (_, token) => {
    const regex = new RegExp(`${token} = "(.*)"`);
    const match = ini.match(regex);

    if (!match || !match[1]) {
        console.warning(`Could not find match for ${token}`);
        return '[TODO]'
    }

    return match[1];
}

module.exports = (serviceName, serviceConfig, yaml, ini) => {
    let fileContents = fs.readFileSync('./serviceTemplate.js',  { encoding: 'utf8' });

    // Find and replace YAML tokens
    fileContents = fileContents.replace(/{yaml\|(.*)}/g, (_, token) => get(yaml, token));

    // Find and replace INI tokens
    fileContents = fileContents.replace(/{ini\|(.*)}/g, getIniReplacement(ini));

    // Write File
    fs.writeFile(`${FILE_PATH}/${serviceName}.js`, fileContents, (err) => {
        if (err) console.error(err);
        console.log(`Completed ${serviceName}`)
    })
}