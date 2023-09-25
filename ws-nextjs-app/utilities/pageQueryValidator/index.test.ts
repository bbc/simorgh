import isValidPageNumber from '.';

describe('Query Validator', () => {
  it.each([
    ['-1', false],
    ['1', true],
    ['40', true],
    ['41', false],
  ])(
    'should evaluate a page number %s to %s',
    (pageNumber, expectedValidationResult) => {
      expect(isValidPageNumber(pageNumber)).toBe(expectedValidationResult);
    },
  );
});
