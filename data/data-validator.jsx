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

const validateBlock = (dataToValidate) => {
	let schemaName = dataToValidate.type;

	if (!schemas.hasOwnProperty(schemaName)) {
		throw "Error: No schema exists for the block " + dataToValidate.type;
	}
	console.log("----------------------------------------------------------------");
	console.log("----------------------------------------------------------------");
	console.log("Validating block: " + schemaName);
	console.log("----------------------------------------------------------------");
	console.log("----------------------------------------------------------------");
	validateNode(schemas[schemaName], dataToValidate, dataToValidate.type);
}


const validateNode = (currentSchemaNode, dataNode, parentName) => {
	validateType(currentSchemaNode, dataNode);
	validateRequired(currentSchemaNode, dataNode);
	validateProperties(currentSchemaNode, dataNode, parentName);
};

const validateType = (currentSchemaNode, dataNode) => {
	if (dataNode != null) {
		if (currentSchemaNode.enum) {
			if (!currentSchemaNode.enum.includes(dataNode)) {
				throw "Error: Type does not exist in enum array for " + dataNode + " node - expected values [" + currentSchemaNode.enum + "] got " + dataNode;
			} else {
				console.log('- Valid enum of: ' + dataNode);
			}
		}

		if (currentSchemaNode.type != typeof(dataNode)) {
			throw "Error: Type does not match for " + dataNode.type + " node - expected " + currentSchemaNode.type + " got " + typeof(dataNode);
		} else {
			console.log("- Valid type of " + typeof(dataNode));
		}
	} else {
		console.log("TYPE OF NULL");
	}
}

const validateRequired = (currentSchemaNode, dataNode) => {
	if (!currentSchemaNode.required) {
		console.log("- No required values to check");
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
		console.log("- No properties to check");
	} else {
		let properties = Object.keys(currentSchemaNode.properties);

		for (let i = 0; i < properties.length; i++) {
			let property = properties[i];
			if (dataNode.hasOwnProperty(property)) {
				console.log("");
				let parentHistory = parentName + ":" + property;
				console.log("Validating property " + parentHistory);
				validateProperty(currentSchemaNode.properties[property], dataNode[property], parentHistory);
			}
		}
	}
};


const validateProperty = (propertySchema, propertyDataNode, parentHistory) => {
	console.log("----------------------------------------------------------------");
	validateNode(propertySchema, propertyDataNode, parentHistory);
	console.log("----------------------------------------------------------------");
}



// const schemaKeys = Object.keys(schemas);

// for (let i = 0; i < schemaKeys.length; i++) {
// 	let key = schemaKeys[i];
// 	validateNode(schemas[key], dataToValidate);
// 	console.log("Successfully validated: " + key);
// }

validateBlock(dataToValidate);

console.log("Validation complete!");







