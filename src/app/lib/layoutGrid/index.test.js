import * as layoutGridExports from '.';

const expectedLayoutGridExports = {
  gelGridMargin: 'object',
  layoutGridWrapper: 'object',
  layoutGridItemLargeNoMargin: 'object',
  layoutGridItemLarge: 'object',
  layoutGridItemMediumNoMargin: 'object',
  layoutGridItemMedium: 'object',
  layoutGridItemSmall: 'object',
  layoutGridItem: 'object',
  nestedGridItemSmallCss: 'object',
  nestedGridItemMediumCss: 'object',
  nestedGridItemLargeCss: 'object',
  gridContainerLargeCss: 'object',
  gridContainerMediumCss: 'object',
  gridContainerSmallCss: 'object',
};

const errorIfMissingKey = (keys, object, message) => {
  keys.forEach((key) => {
    if (!(key in object)) {
      throw new Error(`Missing value '${key}' in ${message}.`);
    }
  });
};

const checkKeysExistInBothObjects = (object1, object2, message1, message2) => {
  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);

  errorIfMissingKey(object1Keys, object2, message2);
  errorIfMissingKey(object2Keys, object1, message1);
};

const checkTypesOfExports = (cssExports, expectedCssExports) => {
  const cssExportsByName = Object.keys(cssExports);
  cssExportsByName.forEach((actualExportName) => {
    const actualExportValue = cssExports[actualExportName];
    const expectedExport = expectedCssExports[actualExportName];
    const typeCheck = typeof actualExportValue === expectedExport; // eslint-disable-line valid-typeof

    // if this fails it is likely that an export is missing from the unit test expectation
    expect(typeCheck).toBe(true);
  });
};

describe('LayoutGrid', () => {
  it('should test all the layout grid exports exist and are the correct type', () => {
    checkKeysExistInBothObjects(layoutGridExports, expectedLayoutGridExports);
    checkTypesOfExports(layoutGridExports, expectedLayoutGridExports);
  });
});
