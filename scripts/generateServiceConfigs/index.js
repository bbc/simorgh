const services = require('./services');
const getData = require('./getData');
const createConfigFile = require('./createConfigFile');

const CONFIG_FILES_PATH = './responsive-news/config';
const TRANSLATION_FILES_PATH = './responsive-news/translations';

Object
    .entries(services)
    .filter(([_, config]) => !config.skip)
    .forEach(([serviceName, serviceConfig]) => {
        console.log('Processing', serviceName, serviceConfig);

        // Get data
        const yaml = getData(`${CONFIG_FILES_PATH}/${serviceName}.yaml`);
        const ini = getData(`${TRANSLATION_FILES_PATH}/${serviceConfig.iniName}.ini`);

        createConfigFile(serviceName, serviceConfig, yaml, ini);
    }
)
