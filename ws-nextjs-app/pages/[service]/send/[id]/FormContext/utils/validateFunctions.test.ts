import { FieldData } from '../../types';
import validateFunctions from './validateFunctions';

describe('validateFunctions', () => {
  describe.each([
    {
      inputRequired: false,
      inputValue: null,
      expectedValid: true,
    },
    {
      inputRequired: true,
      inputValue: null,
      expectedValid: false,
    },
    {
      inputRequired: true,
      inputValue: '    ',
      expectedValid: false,
    },
    {
      inputRequired: true,
      inputValue: ' HEllo world!   ',
      expectedValid: true,
    },
  ])(
    'text',
    ({ inputRequired, inputValue, expectedValid: expectedInvalid }) => {
      it(`should return a ${expectedInvalid} invalid value on a user input of ${inputValue} and a required field of ${inputRequired}`, () => {
        const textData = {
          isValid: false,
          required: inputRequired,
          value: inputValue,
          type: 'text',
        } as unknown as FieldData;

        const result = validateFunctions.text(textData);
        expect(result.isValid).toBe(expectedInvalid);
      });
    },
  );

  describe.each([
    {
      inputRequired: false,
      inputValue: null,
      expectedValid: true,
    },
    {
      inputRequired: true,
      inputValue: null,
      expectedValid: false,
    },
    {
      inputRequired: true,
      inputValue: 'helloworld',
      expectedValid: false,
    },
    {
      inputRequired: true,
      inputValue: '       ',
      expectedValid: false,
    },
    {
      inputRequired: true,
      inputValue: 'hello@googe.com',
      expectedValid: true,
    },
    {
      inputRequired: false,
      inputValue: 'helloworld',
      expectedValid: false,
    },
  ])(
    'email',
    ({ inputRequired, inputValue, expectedValid: expectedInvalid }) => {
      it(`should return a ${expectedInvalid} invalid value on a user input of ${inputValue} and a required field of ${inputRequired}`, () => {
        const textData = {
          isValid: false,
          required: inputRequired,
          value: inputValue,
          type: 'email',
        } as unknown as FieldData;

        const result = validateFunctions.email(textData);
        expect(result.isValid).toBe(expectedInvalid);
      });
    },
  );

  describe.each([
    {
      inputRequired: false,
      inputValue: null,
      expectedValid: true,
    },
    {
      inputRequired: true,
      inputValue: null,
      expectedValid: false,
    },
    {
      inputRequired: true,
      inputValue: 'hello',
      expectedValid: false,
    },
    {
      inputRequired: true,
      inputValue: '     ',
      expectedValid: false,
    },
    {
      inputRequired: true,
      inputValue: '+4480975',
      expectedValid: true,
    },
    {
      inputRequired: false,
      inputValue: 'helloworld',
      expectedValid: false,
    },
  ])('tel', ({ inputRequired, inputValue, expectedValid: expectedInvalid }) => {
    it(`should return a ${expectedInvalid} invalid value on a user input of ${inputValue} and a required field of ${inputRequired}`, () => {
      const textData = {
        isValid: false,
        required: inputRequired,
        value: inputValue,
        type: 'phone',
      } as unknown as FieldData;

      const result = validateFunctions.phone(textData);
      expect(result.isValid).toBe(expectedInvalid);
    });
  });
});
