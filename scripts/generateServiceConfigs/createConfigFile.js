var fs = require('fs');
const get = require('lodash/get');

const FILE_PATH = './generatedConfigs';

const getIniReplacement = (ini, serviceName, config) => (_, token) => {
    if (config.overrides && config.overrides[token]) {
        return config.overrides[token];
    }

    const regex = new RegExp(`${token} = "(.*)"`);
    const match = ini.match(regex);

    if (!match || !match[1]) {
        console.log(`Could not find match for ${token} in ${serviceName} ini`);
        return '[TODO]'
    }

    return match[1];
}

const getYamlReplacement = (yaml, serviceName, config) => (_, token) => {
    if (config.overrides && config.overrides[token]) {
        return config.overrides[token];
    }

    const replacement = get(yaml, interpolateToken(token, serviceName));

    if (!replacement) {
        console.log(`Could not find match for ${token} in ${serviceName} yaml`);
    }

    return replacement || '[TODO]';
}

const interpolateToken = (token, serviceName) => {
    return token.replace('{serviceName}', serviceName);
}

module.exports = (serviceName, serviceConfig, yaml, ini) => {
    let fileContents = fs.readFileSync('./serviceTemplate',  { encoding: 'utf8' });

    // Find and replace YAML tokens
    fileContents = fileContents.replace(/{yaml\|(.*)}/g, getYamlReplacement(yaml, serviceName, serviceConfig));

    // Find and replace INI tokens
    fileContents = fileContents.replace(/{ini\|(.*)}/g, getIniReplacement(ini, serviceName, serviceConfig));

    // Find and replace config tokens
    fileContents = fileContents.replace(/{config\|(.*)}/g,
        (_, token) => serviceConfig[token]
    );

    // Write File
    fs.writeFile(`${FILE_PATH}/${serviceName}.js`, fileContents, (err) => {
        if (err) console.error(err);
    })
}