import * as layoutGridExports from '.';

const expectedLayoutGridExports = {
  gelGridMargin: 'string',
  layoutGridWrapper: 'string',
  layoutGridItemLargeNoMargin: 'string',
  layoutGridItemLarge: 'string',
  layoutGridItemMediumNoMargin: 'function',
  layoutGridItemMedium: 'function',
  layoutGridItemSmall: 'function',
  layoutGridItem: 'string',
  nestedGridItemSmallCss: 'function',
  nestedGridItemMediumCss: 'function',
  nestedGridItemLargeCss: 'function',
  gridContainerLargeCss: 'string',
  gridContainerMediumCss: 'string',
  gridContainerSmallCss: 'string',
};

const errorIfMissingKey = (keys, object, message) => {
  keys.forEach(key => {
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
  cssExportsByName.forEach(actualExportName => {
    const actualExportValue = cssExports[actualExportName];
    const expectedExport = expectedCssExports[actualExportName];

    // eslint-disable-next-line valid-typeof
    if (typeof actualExportValue !== expectedExport) {
      throw new Error(
        `Expected '${actualExportName}' to be a ${expectedExport} but it is a ${typeof actualExportValue}.`,
      );
    }
  });
};

describe('LayoutGrid', () => {
  it('should test all the layout grid exports exist and are the correct type', () => {
    checkKeysExistInBothObjects(layoutGridExports, expectedLayoutGridExports);
    checkTypesOfExports(layoutGridExports, expectedLayoutGridExports);
  });
});
