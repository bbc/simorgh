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

    /*

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

        expect(() => {
            datavalidator.validateProperties(schema.properties, dataWithRecursiveProps, ':article');
        }).not.toThrowError();

        expect(validatePropsMock).toHaveBeenCalledTimes(2);
        expect(validatePropMock).toHaveBeenCalledTimes(4);
    });

    */

    it('isNotFinalTextAttr() should return true if not the final text attribute', () => {
        const data = {
            notText: "Not the final text attribute",
        };

        expect(datavalidator.isNotFinalTextAttr(data)).toEqual(true);
    });

    it('isNotFinalTextAttr() should return false if it is the final text attribute', () => {
        const data = {
            text: "Some article content",
        };

        expect(datavalidator.isNotFinalTextAttr(data)).toEqual(false);
    });

    it('doesPropertyContainBlocks() should return true if dataNode contains blocks', () => {
        const data = {
            blocks: {},
        };

        expect(datavalidator.doesPropertyContainBlocks(data)).toEqual(true);
    });

    it('doesPropertyContainBlocks() should return false if dataNode does not contain blocks', () => {
        const data = {
            text: "Some article content",
        };

        expect(datavalidator.doesPropertyContainBlocks(data)).toEqual(false);
    });

    it('doesPropertyContainBlocks() should return false on non objects', () => {
        const data = "not an object";

        expect(datavalidator.doesPropertyContainBlocks(data)).toEqual(false);
    });

    it('doesPropertyContainBlocks() should return false if dataNode is null', () => {
        expect(datavalidator.doesPropertyContainBlocks(null)).toEqual(false);
    });
});

