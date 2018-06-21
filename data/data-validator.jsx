const yaml = require('yaml-js');
const fs = require('fs');
const yamlSchema = fs.readFileSync('schema.yaml', 'utf8');
const dataToValidate = require('./test/scenario-01.json');

const { components } = yaml.load(yamlSchema);
const { schemas } = components;

const validateNode = (expectedProps, dataNode) => {
	validateType(expectedProps, dataNode);
	validateRequired(expectedProps, dataNode);
	// validateProperties(expectedProps, dataNode);
};

const validateType = (expectedProps, dataNode) => {
	if (expectedProps.enum) {
		if (!expectedProps.enum.includes(dataNode.type)) {
			throw "Error: Type does not exist in enum array for " + dataNode.type + " node - expected values [" + expectedProps.enum + "] got " + dataNode.type;
		}
	}

	if (expectedProps.type != typeof(dataNode)) {
		throw "Error: Type does not match for " + dataNode.type + " node - expected " + expectedProps.type + " got " + typeof(dataNode);
	}
}

const validateRequired = (expectedProps, dataNode) => {
	for (let i = 0; i < expectedProps.required.length; i++) {
		if (!dataNode.hasOwnProperty(expectedProps.required[i])) {
			throw "Error: Missing required prop for " + expectedProps.required[i];
		};
	}
};

// const validateProperties = (expectedProps, dataNode) => {
// 	for (let i = 0; i < expectedProps.properties.length; i++) {
// 		if (!dataNode.hasOwnProperty(expectedProps.required[i])) {
// 			throw "Missing required prop for " + expectedProps.required[i];
// 		};
// 	}
// };

const schemaKeys = Object.keys(schemas);

for (let i = 0; i < schemaKeys.length; i++) {
	let key = schemaKeys[i];
	validateNode(schemas[key], dataToValidate);
	console.log("Successfully validated: " + key);
}
console.log("Validation complete!");
