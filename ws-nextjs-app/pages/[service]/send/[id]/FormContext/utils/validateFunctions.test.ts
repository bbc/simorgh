import { FieldData } from '../../types';
import validateFunctions from './validateFunctions';

describe('validateFunctions', () => {
  describe.each([
    {
      inputRequired: false,
      inputValue: null,
      expectedInvalid: false,
    },
    {
      inputRequired: true,
      inputValue: null,
      expectedInvalid: true,
    },
    {
      inputRequired: true,
      inputValue: '    ',
      expectedInvalid: true,
    },
    {
      inputRequired: true,
      inputValue: ' HEllo world!   ',
      expectedInvalid: false,
    },
  ])('text', ({ inputRequired, inputValue, expectedInvalid }) => {
    it(`should return a ${expectedInvalid} invalid value on a user input of ${inputValue} and a required field of ${inputRequired}`, () => {
      const textData = {
        invalid: false,
        required: inputRequired,
        value: inputValue,
        type: 'text',
      } as unknown as FieldData;

      const result = validateFunctions.text(textData);
      expect(result.invalid).toBe(expectedInvalid);
    });
  });

  describe.each([
    {
      inputRequired: false,
      inputValue: null,
      expectedInvalid: false,
    },
    {
      inputRequired: true,
      inputValue: null,
      expectedInvalid: true,
    },
    {
      inputRequired: true,
      inputValue: 'helloworld',
      expectedInvalid: true,
    },
    {
      inputRequired: true,
      inputValue: '       ',
      expectedInvalid: true,
    },
    {
      inputRequired: true,
      inputValue: 'hello@googe.com',
      expectedInvalid: false,
    },
    {
      inputRequired: false,
      inputValue: 'helloworld',
      expectedInvalid: true,
    },
  ])('email', ({ inputRequired, inputValue, expectedInvalid }) => {
    it(`should return a ${expectedInvalid} invalid value on a user input of ${inputValue} and a required field of ${inputRequired}`, () => {
      const textData = {
        invalid: false,
        required: inputRequired,
        value: inputValue,
        type: 'email',
      } as unknown as FieldData;

      const result = validateFunctions.email(textData);
      expect(result.invalid).toBe(expectedInvalid);
    });
  });

  describe.each([
    {
      inputRequired: false,
      inputValue: null,
      expectedInvalid: false,
    },
    {
      inputRequired: true,
      inputValue: null,
      expectedInvalid: true,
    },
    {
      inputRequired: true,
      inputValue: 'hello',
      expectedInvalid: true,
    },
    {
      inputRequired: true,
      inputValue: '     ',
      expectedInvalid: true,
    },
    {
      inputRequired: true,
      inputValue: '+4480975',
      expectedInvalid: false,
    },
    {
      inputRequired: false,
      inputValue: 'helloworld',
      expectedInvalid: true,
    },
  ])('tel', ({ inputRequired, inputValue, expectedInvalid }) => {
    it(`should return a ${expectedInvalid} invalid value on a user input of ${inputValue} and a required field of ${inputRequired}`, () => {
      const textData = {
        invalid: false,
        required: inputRequired,
        value: inputValue,
        type: 'phone',
      } as unknown as FieldData;

      const result = validateFunctions.phone(textData);
      expect(result.invalid).toBe(expectedInvalid);
    });
  });
});
