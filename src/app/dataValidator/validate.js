const { validateData } = require('./dataValidator');

// invoke the validator for WIP purposes
const data = require('../../../data/test/scenario-01.json');

validateData(data);
