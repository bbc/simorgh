import * as testHelpersFromSrc from './src/index';

const ensureErrorWhenMissingExport = testHelperMethod => {
  // missing export in the expected
  const actualWithAll = { utility: { foo: {}, bar: {} } };
  const expectedMissing = { utility: { bar: {} } };

  expect(() => {
    testHelperMethod(actualWithAll, expectedMissing, 'testing');
  }).toThrowError(
    "Missing value 'foo' in the expected export for 'testing/utility'.",
  );

  // missing export in the actual
  const actualMissing = { utility: { foo: {} } };
  const expectedWithAll = { utility: { bar: {}, foo: {} } };

  expect(() => {
    testHelperMethod(actualMissing, expectedWithAll, 'testing');
  }).toThrowError(
    "Missing value 'bar' in the actual export for 'testing/utility'.",
  );
};

const ensureErrorWhenMissingFileDefinition = testHelperMethod => {
  // missing export in the expected
  const actualWithAll = {
    utilityOne: { key: {} },
    utilityTwo: { key: {} },
  };
  const expectedMissing = {
    utilityOne: { key: {} },
  };

  expect(() => {
    testHelperMethod(actualWithAll, expectedMissing, 'testing');
  }).toThrowError(
    "Missing value 'utilityTwo' in the expected utilities for 'testing'.",
  );

  // missing export in the actual
  const actualMissing = {
    utilityOne: { key: {} },
  };
  const expectedWithAll = {
    utilityOne: { key: {} },
    utilityTwo: { key: {} },
  };

  expect(() => {
    testHelperMethod(actualMissing, expectedWithAll, 'testing');
  }).toThrowError(
    "Missing value 'utilityTwo' in the actual utilities for 'testing'.",
  );
};

describe('Psammead test helpers', () => {
  it('should error if expectedExport is missing an export compared to the actual export when coming from /src', () => {
    ensureErrorWhenMissingExport(testHelpersFromSrc.testUtilityPackages);
  });

  it('should error if file definition is missing in the expectation when coming from /src', () => {
    ensureErrorWhenMissingFileDefinition(
      testHelpersFromSrc.testUtilityPackages,
    );
  });
});
