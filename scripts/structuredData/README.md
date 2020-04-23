# Structured Data Testing

Simorgh uses the [structured-data-testing-tool](https://www.npmjs.com/package/structured-data-testing-tool) library for checking the metadata and structured data for specified pages.

The testing tool can be accessed in 2 ways - via the command line, or via the API. 

## API
This utility uses the API to check structured data for all local URLs (all services & corresponding page types)

`npm run test:structured-data`

The following steps are carried out in order:
- start up the application server
- get the list of local URLs for each page type for each service from Cypress [config](../../cypress/support/config/services.js)
- loop through this list of URLs (both canonical and AMP), and call the `structuredDataTest` API
- a list of results is returned (passed and failed tests, as well as metatags & schemas checked)
- the results are then aggregated, and output to the console
- if there are any failing tests, the command will fail, detailing the failed tests
- stop the application server

### Schemas
The `structured-data-testing-tool` API allows us to configure our own [presets and schemas](https://www.npmjs.com/package/structured-data-testing-tool#how-to-define-your-own-presets).

For each of the page types within Simorgh, certain schema.org schemas are required. e.g. Articles, Photo Galleries and MAPs have an `Article` schema, while MAPs with video clips should have an additional `VideoObject` schema, or `AudioObject` for an audio clip. The mappings between page types and schemas is outlined in [schemas.js](./schemas.js)

### Running this command locally

This command is hooked into the `npm test` command, which is available to run locally.

If you already have an application server running, and you don't wish to restart the application server, the following command can be used:

`npm run test:structured-data:ci`

Only detailed information for failed tests is output using this command.

```

http://localhost:7080/zhongwen/trad/chinese-news-49065935
28 tests passed

http://localhost:7080/swahili/michezo/2016/07/160713_tc2_testmap2
1 tests failed
  ✕  AudioObject schema found
        The property "AudioObject[*]" was not found
```

If you wish to view more detailed information about passing tests, it is possible to use the show info flag - `-i`:

`npm run test:structured-data:ci -- -i`

```
http://localhost:7080/somali
...
  ✓  Twitter should have username of content creator
        └─ "twitter:creator"
                └─"@bbcsomali"

```

### Continuous Integration

This command is hooked into the `npm test` command, meaning that this command will run on CI environments as part of the pipeline.

## CLI

It is also possible to use the CLI tool to test a single URL.  Refer to the [documentation](https://www.npmjs.com/package/structured-data-testing-tool#command-line-interface) for usage information.

- Front Page

`sdtt -u https://www.bbc.com/pidgin -p Google -p SocialMedia -s WebPage`

- Media Asset Page

`sdtt -u https://www.bbc.com/pidgin/tori-52392714 -p Google -p SocialMedia -s Article -s VideoObject`

- Live Radio Page

`sdtt -u https://www.bbc.com/indonesia/bbc_indonesian_radio/liveradio/ -p Google -p SocialMedia -s RadioChannel`
