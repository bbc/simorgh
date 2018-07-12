const { validateEnum } = require('./validateEnum');

describe('validate Enum', () => {
  it('should throw an error when data node is not in schema enum definition', () => {
    const enumData = 'shorthand';
    const schemaEnumArray = ['analysis', 'feature', 'news'];

    expect(() => {
      validateEnum(schemaEnumArray, enumData);
    }).toThrowError(
      'Error: Type does not exist in enum array for shorthand node - expected values [analysis,feature,news] got shorthand',
    );
  });

  it('should not error when data node is in schema enum definition', () => {
    const enumData = 'news';
    const schemaEnumArray = ['analysis', 'feature', 'news'];

    expect(() => {
      validateEnum(schemaEnumArray, enumData);
    }).not.toThrowError();
  });
});
