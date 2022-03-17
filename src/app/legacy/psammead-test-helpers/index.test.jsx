import React from 'react';
import * as testHelpers from '.';
import * as testHelpersFromSrc from './src/index';

const testHelpersExpectedExports = {
  shouldMatchSnapshot: 'function',
  isNull: 'function',
  testUtilityPackages: 'function',
  setWindowValue: 'function',
  resetWindowValue: 'function',
  suppressPropWarnings: 'function',
};

const expectedExports = { testHelpers: testHelpersExpectedExports };

const actualExports = { testHelpers };

const actualExportsFromSrc = { testHelpers: testHelpersFromSrc };

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
  it('should test all the utility exports exist and are the correct type', () => {
    testHelpers.testUtilityPackages(
      actualExports,
      expectedExports,
      'psammead-test-helpers',
    );
  });

  it('should test all the utility exports exist and are the correct type when coming from src/', () => {
    testHelpers.testUtilityPackages(
      actualExportsFromSrc,
      expectedExports,
      'psammead-test-helpers',
    );
  });

  it('should error if expectedExport is missing an export compared to the actual export', () => {
    ensureErrorWhenMissingExport(testHelpers.testUtilityPackages);
  });

  it('should error if expectedExport is missing an export compared to the actual export when coming from /src', () => {
    ensureErrorWhenMissingExport(testHelpersFromSrc.testUtilityPackages);
  });

  it('should error if file definition is missing in the expectation', () => {
    ensureErrorWhenMissingFileDefinition(testHelpers.testUtilityPackages);
  });

  it('should error if file definition is missing in the expectation when coming from /src', () => {
    ensureErrorWhenMissingFileDefinition(
      testHelpersFromSrc.testUtilityPackages,
    );
  });

  const ExampleComponent = () => (
    <main>
      <h1>Hello I am a test component</h1>
    </main>
  );

  testHelpers.shouldMatchSnapshot(
    'should match the snapshot for the test component',
    <ExampleComponent />,
  );

  const ExampleFragment = () => (
    <>
      <h1>Hello I am a test component</h1>
      <p>I am some test text.</p>
    </>
  );

  testHelpers.shouldMatchSnapshot(
    'should match the snapshot for the test component',
    <ExampleFragment />,
  );
});
