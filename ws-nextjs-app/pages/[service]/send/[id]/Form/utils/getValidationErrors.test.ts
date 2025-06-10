import getValidationErrors from './getValidationErrors';
import { FieldData, OnChangeInputName } from '../../types';

const stateData = {
  txt49018765: {
    mandatory: true,
    isValid: false,
    required: true,
    value: '',
    htmlType: 'text',
    messageCode: 'validationRequired',
    wasInvalid: true,
  },
  txt49018894: {
    mandatory: false,
    isValid: true,
    required: false,
    value: '',
    htmlType: 'text',
    messageCode: null,
    wasInvalid: false,
  },
  txt49019016: {
    mandatory: true,
    isValid: false,
    required: true,
    value: '',
    htmlType: 'textarea',
    messageCode: 'validationRequired',
    wasInvalid: true,
  },
  chk49021805: {
    mandatory: false,
    isValid: false,
    required: true,
    value: '',
    htmlType: 'checkbox',
    messageCode: 'validationRequired',
    wasInvalid: true,
  },
} as Record<OnChangeInputName, FieldData>;

const errorList = [
  {
    id: 'txt49018765',
    messageCode: 'validationRequired',
  },
  {
    id: 'txt49019016',
    messageCode: 'validationRequired',
  },
  {
    id: 'chk49021805',
    messageCode: 'validationRequired',
  },
];

describe('getValidationErrors', () => {
  it(`should return a list of validation errors`, () => {
    const result = getValidationErrors(stateData);
    expect(result).toStrictEqual(errorList);
  });
});
