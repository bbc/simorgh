const datavalidator = require('./datavalidator');

const data = {
	type: 'article'
};

describe('Data Validator', () => {
	it('should throws error when schema type and data type do not match', () => {
	    expect(() => {
				datavalidator.validateType('string', data);
	    }).toThrowError(
				'Error: Type does not match for article node - expected string got object'
			);
	});
	it('should throw error when data does not have a required property', () => {
		const schema = {
			required: ['locator', 'passport', 'model'],
			type: 'article',
			properties: {}
		};
			expect(() => {
			datavalidator.validateRequired(schema, data);
		}).toThrowError('Error: Missing required prop for locator');
			const dataWithLocator = {
				type: 'article',
				locator: 'urn:bbc:optimo:asset:c0000000001o'
			}
			expect(() => {
			datavalidator.validateRequired(schema, dataWithLocator);
		}).toThrowError('Error: Missing required prop for passport');
	});
});
