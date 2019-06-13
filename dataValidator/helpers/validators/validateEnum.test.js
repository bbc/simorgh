global.console.log = jest.fn(); // silence console.log during jest tests

const { validateEnum } = require('./validateEnum');

describe('validate Enum', () => {
  it('should throw an error when data node is not in schema enum definition', () => {
    const enumData = 'shorthand';
    const schemaEnumArray = ['analysis', 'feature', 'news'];
    const schemaName = 'category';

    expect(() => {
      validateEnum(schemaEnumArray, enumData, schemaName);
    }).toThrowError(
      `Error: Value does not exist in enum array for 'category' - expected values [analysis,feature,news] got 'shorthand'`,
    );
  });

  it('should not error when data node is in schema enum definition', () => {
    const enumData = 'news';
    const schemaEnumArray = ['analysis', 'feature', 'news'];
    const schemaName = 'category';

    expect(() => {
      validateEnum(schemaEnumArray, enumData, schemaName);
    }).not.toThrowError();
  });
});
