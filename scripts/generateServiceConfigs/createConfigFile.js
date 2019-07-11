// This file loads a template of what a service config should look like
// It then builds a service config for a specific service by inserting
// dynamic content into the template, and then saving the file

var fs = require('fs');
const get = require('lodash/get');

// Where will we save the generated config files?
const FILE_PATH = './generatedConfigs';

// Service configs may choose to override a specific token for a specific service
// This function checks if a config is doing that, and returns the override if so
const getOverride = (config, token) => {
    if (config.overrides && config.overrides[token]) {
        return config.overrides[token];
    }
}

// Given a token and an ini file, get the value at that key within the ini file
const getIniReplacement = (ini, serviceName, config) => (_, token) => {
    const overriddenReplacement = getOverride(config, token);
    if (overriddenReplacement) {
        return overriddenReplacement;
    }

    // See if the ini file has a match for this token
    const regex = new RegExp(`${token} = ["|'](.*)["|']`);
    const match = ini.match(regex);

    // Log out a warning if it doesn't
    if (!match || !match[1]) {
        console.log(`Could not find match for ${token} in ${serviceName} ini`);
        return '[TODO]'
    }

    // Return the first match if it does
    return match[1].replace(/'/g, "\\'");
}

// Given a parsed YAML output and a token, get the value at that token
const getYamlReplacement = (yaml, serviceName, config) => (_, token) => {
    const overriddenReplacement = getOverride(config, token);
    if (overriddenReplacement) {
        return overriddenReplacement;
    }

    const replacement = get(yaml, interpolateToken(token, serviceName));

    if (!replacement) {
        console.log(`Could not find match for ${token} in ${serviceName} yaml`);
        return '[TODO]'
    }

    return replacement.replace(/'/g, "\\'");
}

// Some tokens are themselves dynamic
// this function will interpolate dynamic content into a token
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