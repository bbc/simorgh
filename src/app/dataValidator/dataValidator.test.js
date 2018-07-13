global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const yaml = require('yaml-js'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs'); // eslint-disable-line import/no-extraneous-dependencies
const { validateNode, validateBlock } = require('./dataValidator');
const data = require('../../../data/test/scenario-01.json');

const yamlSchema = fs.readFileSync('./././data/schema.yaml', 'utf8');

const { components } = yaml.load(yamlSchema);
const { article } = components.schemas;

describe('Data Validator', () => {
  it('should not error on validateNode', () => {
    expect(() => {
      validateNode(article, data);
    }).not.toThrowError();
  });

  it('should not error when enum is set', () => {
    const enumSchema = {
      type: 'string',
      enum: ['analysis', 'feature', 'news'],
    };
    const enumData = 'analysis';

    expect(() => {
      validateNode(enumSchema, enumData);
    }).not.toThrowError();
  });

  it('should not error on validateBlock(article)', () => {
    expect(() => {
      validateBlock(data);
    }).not.toThrowError();
  });

  it('should not error on validateBlock(headline)', () => {
    const headlineBlock = data.model.blocks[0];
    expect(() => {
      validateBlock(headlineBlock);
    }).not.toThrowError();
  });

  it('should error when schema does not exist', () => {
    const dataWithBadType = {
      type: 'ich',
    };
    expect(() => {
      validateBlock(dataWithBadType);
    }).toThrowError('Error: No schema exists for the block ich');
  });
});
