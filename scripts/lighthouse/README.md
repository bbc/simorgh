# Lighthouse test runner

This script accepts Lighthouse configs which are set in simorgh/lighthouse.js. Use the config file to set: 
* The URLs Lighthouse should be run against
* The minimum thresholds required to pass each Lighthouse category (accessibility, best-practices, seo, progressive web apps, performance)
* Any other chrome flags desired; currently set to run Lighthouse headlessly

For each URL, the script will output Lighthouse scores for each category. A future version of this script can be made to fail a Travis CI build if minimum thresholds are not met (see logResults' checkFailures function for more detail.)

[Google Chrome Documentation: Using Lighthouse Programmatically](https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically)


## Usage

Run in local development:
`npm run dev`
`npm run test:lighthouse`

 
Run against a production build or in CI:
`npm run test:lighthouse:ci`
