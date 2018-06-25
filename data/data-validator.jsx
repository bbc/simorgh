/*
	To run cd into simorgh/data and run:
	node /Users/phillee/Code/BBC/simorgh/data/data-validator.jsx
 */

const yaml = require('yaml-js');
const fs = require('fs');
const yamlSchema = fs.readFileSync('schema.yaml', 'utf8');
const dataToValidate = require('./test/scenario-01.json');

const { components } = yaml.load(yamlSchema);
const { schemas } = components;

const validateBlock = (dataToValidate, parentName = "") => {
	let schemaName = dataToValidate.type;

	if (!schemas.hasOwnProperty(schemaName)) {
		throw "Error: No schema exists for the block " + dataToValidate.type;
	}
	console.log("");
	console.log("");
	console.log("Validating block: " + schemaName);
	console.log("----------------------------------------------------------------");
	let blockSchema = schemas[schemaName];
	validateNode(blockSchema, dataToValidate, parentName + ":" + dataToValidate.type);
}

const checkIfNodeIsABlock = (currentSchemaNode, dataNode, parentHistory) => {
	if (dataNode) {

		// we are in model with either no type and object keyed as '$ref' (headline:model in schema)
		// OR
		// we are in model with object keyed as 'blocks' (article:model in schema)
		// and need to start validating the block again
		if (currentSchemaNode.type === undefined && currentSchemaNode.hasOwnProperty('$ref') ||
			dataNode.hasOwnProperty('blocks')) {

			// if this is the final text attribute
			if (dataNode.hasOwnProperty('text')) {
				if (typeof(dataNode) === "string") {
					console.log("Valid text string");
				}
			} else {
				for (let j = 0; j < dataNode['blocks'].length; j++) {
					validateBlock(dataNode['blocks'][j], parentHistory);
				}
			}
		}
	}
}

const validateNode = (currentSchemaNode, dataNode, parentName) => {
	validateType(currentSchemaNode, dataNode);
	validateRequired(currentSchemaNode, dataNode);
	validateProperties(currentSchemaNode, dataNode, parentName);
};

const validateType = (currentSchemaNode, dataNode) => {
	// needed for seoHeadline being null
	if (dataNode == null) {
		console.log("TYPE OF NULL");
	} else if (currentSchemaNode.type) {
		if (dataNode['text'] && !dataNode['blocks']) {
		} else {

			if (currentSchemaNode.enum) {
				if (!currentSchemaNode.enum.includes(dataNode)) {
					throw "Error: Type does not exist in enum array for " + dataNode + " node - expected values [" + currentSchemaNode.enum + "] got " + dataNode;
				} else {
					console.log('- Valid enum of ' + dataNode);
				}
			}

			if (currentSchemaNode.type != typeof(dataNode)) {
				console.log('meh');
				throw "Error: Type does not match for " + dataNode.type + " node - expected " + currentSchemaNode.type + " got " + typeof(dataNode);
			} else {
				console.log("- Valid type of " + typeof(dataNode));
			}
		}
	}
}

const validateRequired = (currentSchemaNode, dataNode) => {
	if (!currentSchemaNode.required) {
	// 	console.log("- No required values to check");
	} else {
		console.log("- Required values successfully found:");
		for (let i = 0; i < currentSchemaNode.required.length; i++) {
			if (!dataNode.hasOwnProperty(currentSchemaNode.required[i])) {
				throw "Error: Missing required prop for " + currentSchemaNode.required[i];
			}
			else console.log("  - " + currentSchemaNode.required[i]);
		}
	}
};

const validateProperties = (currentSchemaNode, dataNode, parentName) => {
	if (!currentSchemaNode.properties) {
		// console.log("- No properties to check");
	} else {
		let properties = Object.keys(currentSchemaNode.properties);

		for (let i = 0; i < properties.length; i++) {
			let property = properties[i];
			console.log("");
			let parentHistory = parentName + ":" + property;
			let propertySchema = currentSchemaNode.properties[property];

			console.log("Validating property " + parentHistory);
			// console.log("----------------------------------------------------------------");
			checkIfNodeIsABlock(propertySchema, dataNode[property], parentHistory);
			validateNode(propertySchema, dataNode[property], parentHistory);
		}
	}
};


validateBlock(dataToValidate);

console.log("");
console.log("Validation complete!");





