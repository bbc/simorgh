# Service Config Generator

This package is used to generate Simorgh service config files by parsing INI and YAML files from the responsive-news repo


# Usage

1. Navigate to the `scripts/generateServiceConfigs` directory and `npm install` the dependencies
2. Pull the latest YAML config files from [here](https://github.com/BBC-News/responsive-news/tree/9000f2296e1a6f2d0f2574fc2d15662aa2121fe8/configurator/src/main/BBC/News/Config) and put them in the `responsive-news/config` directory in this package
3. Pull the latest INI translation files from [here](https://github.com/BBC-News/responsive-news/tree/493bfa49fbacd4af72263a74feefe4a82681fd5a/vocabs/src/main/BBC/News/Translation) and put them in the `responsive-news/translations` directory in this package
4. Execute `index.js` with Node (`node .`)
5. This will add the generated service configs in the `generatedConfigs` directory, where they can be reviewed and moved to the correct directory within Simorgh if the output is acceptable

## Modifying Output

The generated output files are templated from the `serviceTemplate` file.  This is a JS file that will have different content interpolated into it for each service.  The interpolation looks for specific key patterns - eg:

- **`{ini|base.brand}`**
  - will be replaced by the content in the `base.brand` key of the INI file for this service
- **`{yaml|open_graph.twitter_handle}`**
  - will be replaced by the content in the `open_graph.twitter_handle` key of the YAML file for this service
- **`{config|serviceName}`**
  - will be replaced by the content in the `serviceName` key of the config object (in `services.js`) for this service

## Modifying Behavior

The execution of the script is mostly configured from the `services.js` file.  That file includes a list of all services to generate, as well as some configuration options for each service:

- `skip: true` will cause the service to be skipped over, not generating a config file
- `iniName` is the name of the ini file, excluding the extension.  The `yaml` file is assumed to have the same name as the service
- `overrides` allows the keys in the `serviceTemplate` to be overridden for this particular service
- `yamlCleaner` is a function that takes in the YAML output, modifies it, and returns a new YAML file.  This is useful as some of the YAML files in `responsive-news` are not semantically correct
