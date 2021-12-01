import {
  selectColour,
  getRelativeLuminance,
  hexToRgb,
  contrastRatioFromLuminances,
} from './utils';

describe('hexToRgb', () => {
  it.each`
    scenario | inputHex       | expectedResult
    ${1}     | ${''}          | ${null}
    ${2}     | ${{}}          | ${null}
    ${3}     | ${[255, 0, 0]} | ${null}
    ${4}     | ${'#000'}      | ${[0, 0, 0]}
    ${5}     | ${'#f00'}      | ${[255, 0, 0]}
    ${6}     | ${'#ff0'}      | ${[255, 255, 0]}
    ${7}     | ${'#fff'}      | ${[255, 255, 255]}
    ${8}     | ${'#0ff'}      | ${[0, 255, 255]}
    ${9}     | ${'#123'}      | ${[17, 34, 51]}
    ${10}    | ${'#abc'}      | ${[170, 187, 204]}
    ${11}    | ${'#000000'}   | ${[0, 0, 0]}
    ${12}    | ${'#ff0000'}   | ${[255, 0, 0]}
    ${13}    | ${'#ffff00'}   | ${[255, 255, 0]}
    ${14}    | ${'#ffffff'}   | ${[255, 255, 255]}
    ${15}    | ${'#123456'}   | ${[18, 52, 86]}
    ${16}    | ${'#abcdef'}   | ${[171, 205, 239]}
  `(
    '[scenario $scenario]: correctly converts a hex value to rgb',
    ({ inputHex, expectedResult }) => {
      expect(hexToRgb(inputHex)).toEqual(expectedResult);
    },
  );
});

describe('getRelativeLuminance', () => {
  it.each`
    scenario | inputRgb           | expectedResult
    ${1}     | ${[0, 0, 0]}       | ${0}
    ${2}     | ${[10, 0, 0]}      | ${0.0006}
    ${3}     | ${[0, 10, 0]}      | ${0.0022}
    ${4}     | ${[0, 0, 10]}      | ${0.0002}
    ${5}     | ${[10, 10, 10]}    | ${0.0031}
    ${6}     | ${[255, 0, 0]}     | ${0.2126}
    ${7}     | ${[0, 255, 0]}     | ${0.7152}
    ${8}     | ${[0, 0, 255]}     | ${0.0722}
    ${9}     | ${[255, 255, 255]} | ${1}
  `(
    '[scenario $scenario]: correctly calculates relative luminances',
    ({ inputRgb, expectedResult }, done) => {
      const result = getRelativeLuminance(inputRgb);
      const areApproximatelyEqual = Math.abs(result - expectedResult) < 0.001;

      if (areApproximatelyEqual) {
        done();
      } else {
        done.fail(`Expected ${result} to be approximately ${expectedResult}`);
      }
    },
  );
});

describe('contrastRatioFromLuminances', () => {
  it.each`
    scenario | luminance1 | luminance2 | expectedResult
    ${1}     | ${0}       | ${0}       | ${1}
    ${2}     | ${1}       | ${1}       | ${1}
    ${3}     | ${0}       | ${1}       | ${21}
    ${4}     | ${1}       | ${0}       | ${21}
    ${5}     | ${0.1}     | ${0.9}     | ${6.333}
    ${6}     | ${0.4}     | ${0.6}     | ${1.444}
  `(
    '[scenario $scenario]: correctly calculates the contrast ratio between two luminance values',
    ({ luminance1, luminance2, expectedResult }, done) => {
      const result = contrastRatioFromLuminances(luminance1, luminance2);
      const areApproximatelyEqual = Math.abs(result - expectedResult) < 0.001;
      if (areApproximatelyEqual) {
        done();
      } else {
        done.fail(`Expected ${result} to be approximately ${expectedResult}`);
      }
    },
  );
});

const buildPalette = options => options.map(hexToRgb);

const fallbackColour = '#000';
const fallbackResult = {
  isFallback: true,
  hex: fallbackColour,
  rgb: hexToRgb(fallbackColour),
};

describe('selectColour', () => {
  it.each`
    scenario | options                     | minimumContrast | contrastColour | expectedResult
    ${1}     | ${null}                     | ${1}            | ${'#000'}      | ${'fallback'}
    ${2}     | ${{ junk: 'value' }}        | ${1}            | ${'#000'}      | ${'fallback'}
    ${3}     | ${[]}                       | ${1}            | ${'#000'}      | ${'fallback'}
    ${4}     | ${['#f00', '#ff0', '#fff']} | ${0}            | ${'#000'}      | ${'#ffff00'}
    ${5}     | ${['#fff', '#ff0', '#f00']} | ${0}            | ${'#000'}      | ${'#ff0000'}
    ${6}     | ${['#f00', '#ff0', '#fff']} | ${5}            | ${'#000'}      | ${'#ffff00'}
    ${7}     | ${['#f00', '#ff0', '#fff']} | ${15}           | ${'#000'}      | ${'#ffff00'}
    ${8}     | ${['#f00', '#ff0', '#fff']} | ${20}           | ${'#000'}      | ${'#ffffff'}
    ${9}     | ${['#f00', '#ff0', '#fff']} | ${50}           | ${'#000'}      | ${'fallback'}
    ${10}    | ${['#fff', '#fef', '#fff']} | ${0}            | ${'#000'}      | ${'#ffeeff'}
    ${11}    | ${['#fff', '#fff', '#fef']} | ${0}            | ${'#000'}      | ${'#ffeeff'}
    ${12}    | ${['#fff', '#fef', '#fdf']} | ${0}            | ${'#000'}      | ${'#ffddff'}
  `(
    '[scenario $scenario]: selects an appropriate colour given a list of options and requirements',
    ({ options, minimumContrast, contrastColour, expectedResult }) => {
      const palette = Array.isArray(options) ? buildPalette(options) : [];

      const result = selectColour({
        palette,
        minimumContrast,
        contrastColour,
        fallbackColour,
      });
      if (expectedResult === 'fallback') {
        expect(result).toEqual(fallbackResult);
      } else {
        expect(result.hex).toBe(expectedResult);
        expect(result.rgb).toEqual(hexToRgb(expectedResult));
        expect(result.fallback).toBeFalsy();
      }
    },
  );
});
