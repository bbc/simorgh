// node scripts/generateServiceConfigs

const services = require('./services');

Object
    .entries(services)
    .filter(([_, config]) => !config.skip)
    .forEach(([serviceName, serviceConfig]) => {
        console.log('Processing', serviceName, serviceConfig);
        // Get data
        // https://github.com/BBC-News/responsive-news/tree/develop/vocabs/src/main/BBC/News/Translation
        // https://github.com/BBC-News/responsive-news/tree/develop/configurator/src/main/BBC/News/Config

        // Build Config

        // Write File
    }
)
