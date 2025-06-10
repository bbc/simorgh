import { FieldData, InvalidMessageCodes } from '../../types';
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

  describe.each([
    {
      inputRequired: false,
      inputValue: [],
      expectedValid: true,
      expectedMessageCode: null,
      testMessage: 'No file uploaded and not required.',
    },
    {
      inputRequired: true,
      inputValue: [],
      expectedValid: false,
      minFileCount: 1,
      expectedMessageCode: InvalidMessageCodes.NotEnoughFiles,
      testMessage: 'No file uploaded and at least 1 file is required.',
    },
    {
      inputRequired: true,
      inputValue: [{ name: 'hello', type: 'image/jpeg' }],
      expectedValid: true,
      expectedMessageCode: null,
      testMessage: 'File uploaded and at least 1 file is required.',
    },
    {
      inputRequired: false,
      inputValue: [{ name: 'hello', type: 'image/jpeg' }],
      expectedValid: true,
      expectedMessageCode: null,
      testMessage: 'File uploaded, but not required.',
    },
    {
      inputRequired: true,
      inputValue: [
        { name: 'hello', type: 'image/jpeg' },
        { name: 'hello', type: 'image/jpeg' },
        { name: 'hello', type: 'image/jpeg' },
      ],
      expectedValid: false,
      maxFileCount: 2,
      expectedMessageCode: InvalidMessageCodes.TooManyFiles,
      testMessage: 'Files uploaded exceed the expected limit of two files.',
    },
    {
      inputRequired: false,
      inputValue: [
        { name: 'hello', type: 'image/jpeg' },
        { name: 'hello', type: 'image/jpeg' },
        { name: 'hello', type: 'image/jpeg' },
      ],
      expectedValid: false,
      maxFileCount: 2,
      expectedMessageCode: InvalidMessageCodes.TooManyFiles,
      testMessage:
        'Optional Files uploaded exceed the expected limit of two files.',
    },
    {
      inputRequired: true,
      inputValue: [
        { name: 'hello', type: 'image/jpeg', size: '1300000000' },
        { name: 'hello', type: 'image/jpeg', size: '100' },
      ],
      expectedValid: false,
      expectedMessageCode: InvalidMessageCodes.FileTooBig,
      testMessage: 'File size total too big.',
    },
  ])(
    'file',
    ({
      inputRequired,
      inputValue,
      expectedValid: expectedInvalid,
      minFileCount = 0,
      maxFileCount = 3,
      expectedMessageCode,
      testMessage,
    }) => {
      it(`${testMessage}`, () => {
        const textData = {
          min: minFileCount,
          max: maxFileCount,
          isValid: false,
          required: inputRequired,
          value: inputValue.map(fileData => ({
            file: fileData,
          })),
          fileTypes: ['image/jpeg'],
          type: 'file',
        } as unknown as FieldData;

        const result = validateFunctions.file(textData);
        expect(result.isValid).toBe(expectedInvalid);
        expect(result.messageCode).toBe(expectedMessageCode);
      });
    },
  );

  describe.each([
    {
      inputRequired: true,
      inputValue: [
        { file: { name: 'hello', type: 'application/pdf', size: '100' } },
      ],
      expectedValid: false,
      maxFileCount: 2,
      expectedValue: [
        {
          file: { name: 'hello', type: 'application/pdf', size: '100' },
          messageCode: InvalidMessageCodes.WrongFileType,
        },
      ],
      testMessage: 'Wrong File Type.',
    },
    {
      inputRequired: true,
      inputValue: [
        { file: { name: 'hello', type: 'image/jpeg', size: '100' } },
      ],
      expectedValid: true,
      expectedValue: [
        {
          file: { name: 'hello', type: 'image/jpeg', size: '100' },
          messageCode: null,
        },
      ],
      testMessage: 'Correct File Type.',
    },
    {
      inputRequired: true,
      inputValue: [{ file: { name: 'hello', type: 'image/jpeg', size: '0' } }],
      expectedValid: false,
      expectedValue: [
        {
          file: { name: 'hello', type: 'image/jpeg', size: '0' },
          messageCode: InvalidMessageCodes.FileTooSmall,
        },
      ],
      testMessage: 'File too small.',
    },
  ])(
    'individual files',
    ({
      inputRequired,
      inputValue,
      expectedValid: expectedInvalid,
      expectedValue,
      testMessage,
    }) => {
      it(`${testMessage}`, () => {
        const textData = {
          min: 0,
          max: 3,
          isValid: false,
          required: inputRequired,
          value: inputValue,
          fileTypes: ['image/jpeg'],
          type: 'file',
        } as unknown as FieldData;

        const result = validateFunctions.file(textData);
        expect(result.isValid).toBe(expectedInvalid);
        expect(result.value).toStrictEqual(expectedValue);
      });
    },
  );
});
