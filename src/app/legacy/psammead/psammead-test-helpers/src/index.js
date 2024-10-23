import { render } from '@testing-library/react';
import { clone as deepClone } from 'rambda';

export const shouldMatchSnapshot = (title, component) => {
  it(title, () => {
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
};

export const isNull = (title, component) => {
  it(title, () => {
    const { container } = render(component);
    expect(container.firstChild).toBeNull();
  });
};

export const setWindowValue = (key, value) => {
  const windowValue = window[key];
  delete window[key];

  let newValue = value;

  if (value && typeof value === 'object') {
    newValue = {
      ...deepClone(windowValue),
      ...value,
    };
  }

  Object.defineProperty(window, key, {
    value: newValue,
    writable: true,
  });
};

export const resetWindowValue = (key, value) => {
  Object.defineProperty(window, key, {
    value,
    writable: true,
  });
};

export const suppressPropWarnings = warnings => {
  const { expectedWarnings } = window;
  if (expectedWarnings && Array.isArray(expectedWarnings)) {
    window.expectedWarnings = [...expectedWarnings, warnings];
  } else {
    window.expectedWarnings = [warnings];
  }
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

const checkTypesOfExports = (
  actualExportsByName,
  actualExports,
  expectedExports,
  utilityName,
) => {
  actualExportsByName.forEach(actualExportName => {
    const actualExportValue = actualExports[utilityName][actualExportName];
    const expectedExport = expectedExports[utilityName][actualExportName];
    const typeCheck = typeof actualExportValue === expectedExport; // eslint-disable-line valid-typeof

    // if this fails it is likely that an export is missing from the unit test expectation
    expect(typeCheck).toBe(true);
  });
};

export const testUtilityPackages = (
  actualExports,
  expectedExports,
  packageName,
) => {
  const actualUtilities = Object.keys(actualExports);

  // check if the actual exported file has defined expected values to match and that the expected values are actually exported
  checkKeysExistInBothObjects(
    actualExports,
    expectedExports,
    `the actual utilities for '${packageName}'`,
    `the expected utilities for '${packageName}'`,
  );

  actualUtilities.forEach(utilityName => {
    const actualExportsByName = Object.keys(actualExports[utilityName]);

    // check if each of the actual exported consts have an expected value to match and that the expected values are actually exported
    checkKeysExistInBothObjects(
      actualExports[utilityName],
      expectedExports[utilityName],
      `the actual export for '${packageName}/${utilityName}'`,
      `the expected export for '${packageName}/${utilityName}'`,
    );

    checkTypesOfExports(
      actualExportsByName,
      actualExports,
      expectedExports,
      utilityName,
    );
  });
};
