const yaml = require('yaml-js'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs'); // eslint-disable-line import/no-extraneous-dependencies

const yamlSchema = fs.readFileSync('./././data/schema.yaml', 'utf8');
const { components } = yaml.load(yamlSchema);
const { schemas } = components;

module.exports.loadSchema = () => schemas;
