const datavalidator = require('./datavalidator');

const dataArticleWrapper = {
    type: 'article'
};

describe('Data Validator', () => {
    it('should throw an error when schema type and data type do not match', () => {
        const schemaType = 'string';

        expect(() => {
            datavalidator.validateType(schemaType, dataArticleWrapper);
        }).toThrowError(
            'Error: Type does not match for article node - expected string got object'
        );
    });

    it('should throw an error when data node is not in schema enum', () => {
        const enumData = 'shorthand'
        const schemaEnumArray = ['analysis', 'feature', 'news'];

        expect(() => {
            datavalidator.validateEnum(schemaEnumArray, enumData);
        }).toThrowError(
            'Error: Type does not exist in enum array for shorthand node - expected values [analysis,feature,news] got shorthand'
        );
    });

    it('should throw error when data does not have a required property', () => {
        const schema = {
            required: ['locator', 'passport', 'model'],
            type: 'article',
            properties: {}
        };
            expect(() => {
            datavalidator.validateRequired(schema.required, dataArticleWrapper);
        }).toThrowError('Error: Missing required prop for locator');
            const dataWithLocator = {
                type: 'article',
                locator: 'urn:bbc:optimo:asset:c0000000001o'
            }
            expect(() => {
            datavalidator.validateRequired(schema.required, dataWithLocator);
        }).toThrowError('Error: Missing required prop for passport');
    });

    it('should loop over all properties and validate them individually', () => {
        const schema = {
            type: 'object',
            required: [
                'passport'
            ],
            properties: {
                passport: {
                    type: 'object',
                    required: [
                        'home',
                        'language',
                        'articleType',
                    ],
                    properties: {
                        language: {
                            type: 'string',
                        },
                        home: {
                            type: 'string',
                        },
                        articleType: {
                            type: 'string',
                            enum: [
                                'analysis',
                                'feature',
                                'news',
                            ],
                        },
                    },
                },
            },
        };

        const dataWithRecursiveProps = {
            "passport": {
                "language": "en-gb",
                "home": "http://www.bbc.co.uk/ontologies/passport/home/News",
                "articleType": "news",
                "genre": null
            },
            "type": "article",
        };

        const validatePropMock = jest.spyOn(datavalidator, "validateProperty");
        const validatePropsMock = jest.spyOn(datavalidator, 'validateProperties');

        datavalidator.validateNode(schema, dataWithRecursiveProps)

        expect(validatePropsMock).toHaveBeenCalledTimes(2);
        expect(validatePropMock).toHaveBeenCalledTimes(4);
    });
});
