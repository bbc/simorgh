/*
	To run cd into simorgh/data and run:
	node /Users/phillee/Code/BBC/simorgh/data/data-validator.jsx
 */

 // disable function define before call due to recursive nature of schema
 /* eslint no-use-before-define: 0 */

const yaml = require('yaml-js');
const fs = require('fs'); // eslint-disable-line import/no-extraneous-dependencies
const data = require('./test/scenario-01.json');

const yamlSchema = fs.readFileSync('schema.yaml', 'utf8');

const { components } = yaml.load(yamlSchema);
const { schemas } = components;

const log = message => {
	console.log(message); // eslint-disable-line no-console
}

const throwError = errorMsg => {
	throw errorMsg;
}

const isNotFinalTextAttr = dataNode =>	{
	if ('text' in dataNode && typeof(dataNode.text) === 'string') {
		log('Valid text string');
		return false;
	};
	return true;
};

const validateBlocks = (blocks, parentName) => {
	blocks.forEach(
		block => validateBlock(block, parentName)
	);
};

const doesPropertyContainBlocks = dataNode => {
	// dataNode is an object and has key 'blocks'
	if (typeof(dataNode) === 'object' && dataNode != null) {
		return 'blocks' in dataNode;
	}
	return false;
}

const validateProperty = (propertySchema, dataProperty, parentName) => {
	log('');
	log(`Validating property ${parentName}`);

	if (doesPropertyContainBlocks(dataProperty)) {
		if (isNotFinalTextAttr(dataProperty)) {
			validateBlocks(dataProperty.blocks, parentName);
		}
	} else {
		validateNode(propertySchema, dataProperty, parentName);
	}
}

const validateProperties = (currentSchemaNode, dataNode, parentName) => {
	if (currentSchemaNode.properties) {
		Object.keys(currentSchemaNode.properties)
			.forEach( property => {
				const parentHistory = `${parentName}:${property}`;
				const propertySchema = currentSchemaNode.properties[property];
				validateProperty(propertySchema, dataNode[property], parentHistory);
			}
		);
 	}
};

const validateRequired = (currentSchemaNode, dataNode) => {
	if (currentSchemaNode.required) {
		log('- Required values successfully found:');
		currentSchemaNode.required.forEach(
			requiredProp => {
				if (! (requiredProp in dataNode) ) {
					throwError(`Error: Missing required prop for ${requiredProp}`);
				}
				else {
					log(`  - ${requiredProp}`);
				}
			}
		);
	}
};

const validateEnum = (schemaEnums, dataNode) => {
	if (schemaEnums.includes(dataNode)) {
		log(`- Valid enum of ${dataNode}`);
	} else {
		throwError(`'Error: Type does not exist in enum array for ${dataNode} node - expected values [${schemaEnums}] got ${dataNode}`);
	}
}

const validateType = (schemaType, dataNode) => {
	if (schemaType === `${typeof(dataNode)}`) {
		log(`- Valid type of ${typeof(dataNode)}`);
	} else {
		throwError(`Error: Type does not match for ${dataNode.type} node - expected ${schemaType} got ${typeof(dataNode)}`);
	}
}

const validateEnumAndType = (currentSchemaNode, dataNode) => {
	if (dataNode !== null && currentSchemaNode.type) {
		if (currentSchemaNode.enum) {
			validateEnum(currentSchemaNode.enum, dataNode);
		}

		validateType(currentSchemaNode.type, dataNode);
	}
}

const validateNode = (currentSchemaNode, dataNode, parentName) => {
	validateEnumAndType(currentSchemaNode, dataNode);
	validateRequired(currentSchemaNode, dataNode);
	validateProperties(currentSchemaNode, dataNode, parentName);
};

const validateBlock = (dataToValidate, parentName = '') => {
	const schemaName = dataToValidate.type;

	if (! (schemaName in schemas) ) {
		throwError(`Error: No schema exists for the block ${dataToValidate.type}`);
	}

	log('');
	log('');
	log(`Validating block: ${schemaName}`);
	log('----------------------------------------------------------------');

	const blockSchema = schemas[schemaName];
	validateNode(blockSchema, dataToValidate, `${parentName}:${dataToValidate.type}`);
}

console.time('validateBlock'); // eslint-disable-line no-console
validateBlock(data);

log('');
log('Validation complete!');
console.timeEnd('validateBlock'); // eslint-disable-line no-console

