import { testUtilityPackages } from '#legacy/psammead-test-helpers/src';
import * as underTest from '.';

jest.mock('@storybook/addon-knobs');

jest.mock('#legacy/gel-foundations/src/scripts', () => ({
  latin: 'LATIN SCRIPT OBJECT',
  arabic: 'ARABIC SCRIPT OBJECT',
  cyrillic: 'CYRILLIC SCRIPT OBJECT',
}));

const textVariantsExpectedExports = {
  TEXT_VARIANTS: 'object',
};

const expectedExports = {
  textVariants: textVariantsExpectedExports,
};

const actualExports = {
  textVariants: { TEXT_VARIANTS: underTest.TEXT_VARIANTS },
};

describe('Psammead storybook helpers', () => {
  it('should test all the utility exports exist and are the correct type', () => {
    testUtilityPackages(
      actualExports,
      expectedExports,
      'psammead-storybook-helpers',
    );
  });
});
