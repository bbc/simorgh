const yaml = require('yaml-js');
const fs = require('fs');

const yamlSchema = fs.readFileSync('./././data/schema.yaml', 'utf8');
const { components } = yaml.load(yamlSchema);
const { schemas } = components;

module.exports.getAllSchemas = () => schemas;
