# Cypress Page Generator
## Premise
Our cypress service config has become so big and so convoluted that making changes to it is very painful. It would be better if there was a way of automating the process of selecting simorgh urls from a pool of available urls. This script solves that problem. It takes a series of urls of different page types, it filters out non simorgh urls and then creates the cypress object schema. 

## Usage
1. Run the command:
```node cypressPageGenerator/index.js```
This will generate a services.json file in `cypress/support/config/` directory
2. Copy over the json file and put it in place of the `services` object in `services.js`
3. Run eslint over it so that it correctly formats the object
4. Replace `'undefined'` with `undefined`

## Running stage cypress tests:
`CYPRESS_SMOKE=false CYPRESS_APP_ENV=stage npm run cypress`
