const datavalidator = require('./datavalidator');

describe('Data Validator', () => {
	it('should throws error when schema type and data type do not match', () => {
		const data = {
			type: 'article',
			properties: {}
		}

	    expect(() => {
			datavalidator.validateType('string', data);
	    }).toThrowError('Error: Type does not match for article node - expected string got object');
	});
});
