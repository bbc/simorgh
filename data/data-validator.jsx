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


const validateNode = (currentSchemaNode, dataNode, parentName) => {
	validateType(currentSchemaNode, dataNode);
	validateRequired(currentSchemaNode, dataNode);
	validateProperties(currentSchemaNode, dataNode, parentName);
};

const validateProperty = (propertySchema, dataProperty, parentName) => {
	log('');
	log(`Validating property ${parentName}`);

	checkIfNodeIsABlock(propertySchema, dataProperty, parentName);
	validateNode(propertySchema, dataProperty, parentName);
}

const validateBlock = (dataToValidate, parentName = '') => {
	const schemaName = dataToValidate.type;

	if (! (schemaName in schemas) ) {
		const errorMsg = `Error: No schema exists for the block ${dataToValidate.type}`;
		throw errorMsg;
	}
	log('');
	log('');
	log(`Validating block: ${schemaName}`);
	log('----------------------------------------------------------------');

	const blockSchema = schemas[schemaName];
	validateNode(blockSchema, dataToValidate, `${parentName}:${dataToValidate.type}`);
}

const checkIfNodeIsABlock = (currentSchemaNode, dataNode, parentHistory) => {
	if (dataNode) {

		// no type and object has key '$ref' (headline:model in schema)
		// OR
		// dataNode is an object and has key 'blocks' (article:model in schema)
		// and need to start validating the block again
		if (currentSchemaNode.type === undefined && '$ref' in currentSchemaNode ||
			typeof(dataNode) === 'object' && 'blocks' in dataNode) {

			// if this is the final text attribute
			if ('text' in dataNode) {
				if (typeof(dataNode.text) === 'string') {
					log('Valid text string');
				}
			} else {
				dataNode.blocks.forEach(
					block => validateBlock(block, parentHistory)
				);
			}
		}
	}
}

const validateType = (currentSchemaNode, dataNode) => {
	// needed for dataNode being null EG: seoHeadline
	if (dataNode == null) {
		log('TYPE OF NULL');
	} else if (currentSchemaNode.type) {
		if (! (dataNode.text && !dataNode.blocks) ) {
			if (currentSchemaNode.enum) {
				if (!currentSchemaNode.enum.includes(dataNode)) {
					const errorMsg = `'Error: Type does not exist in enum array for ${dataNode} node - expected values [${currentSchemaNode.enum}] got ${dataNode}`;
					throw errorMsg;
				} else {
					log(`- Valid enum of ${dataNode}`);
				}
			}

			if (currentSchemaNode.type !== `${typeof(dataNode)}`) {
				const errorMsg = `Error: Type does not match for ${dataNode.type} node - expected ${currentSchemaNode.type} got ${typeof(dataNode)}`;
				throw errorMsg;
			} else {
				log(`- Valid type of ${typeof(dataNode)}`);
			}
		}
	}
}

const validateRequired = (currentSchemaNode, dataNode) => {
	if (currentSchemaNode.required) {
		log('- Required values successfully found:');
		currentSchemaNode.required.forEach(
			requiredProp => {
				if (! (requiredProp in dataNode) ) {
					const errorMsg = `Error: Missing required prop for ${requiredProp}`;
					throw errorMsg;
				}
				else {
					log(`  - ${requiredProp}`);
				}
			}
		);
	}
};

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

validateBlock(data);

log('');
log('Validation complete!');
